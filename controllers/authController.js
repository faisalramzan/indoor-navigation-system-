const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateResetToken, generateExpiryTime } = require('../token/token');
const SECRET_KEY = process.env.SECRET_KEY;
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send('Invalid email or password.');
        // Compare the password
        const validPassword = await bcrypt.compare(password, user.password);
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ token });
        if (!validPassword) return res.status(400).send('Invalid email or password.');

    }

    catch (err) {
        res.status(500).json({ message: 'Server error' });


    }


}
exports.forgetPassword = async (req, res) => {
    const email = req.body.email;
    try {// email checking 
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send('Invalid email.');
        // if eamil is valid then genrate resttoken and sving in db  
        const restToken = generateResetToken();
        const expireTime = generateExpiryTime()
        user.resetPasswordToken = restToken;
        user.resetPasswordExpires = expireTime;
        const userInfo = await user.save();
        res.status(200).json({
            message: 'reset token has been created.',
            data: {
                restToken: userInfo.resetPasswordToken,
                expireTime: userInfo.resetPasswordExpires,
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const { token } = req.params;
        if (!token || token === ':token') {
            return res.status(400).json({ message: 'Token is required' });
        }
        const user = await User.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid' });
        }
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: ' Token is Expired' });
        }
        user.password = newPassword;
        const userInfo = await user.save();
        console.log(userInfo, 'youre passward is updated')
    }
    catch (err) {
        return res.status(500).json({
            message: 'Interna Server Error'
        })
    }
}


