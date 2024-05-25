const User = require('../models/User');

exports.create = async (req, res) => {

    try{// Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User already registered.' });
        }
        const { name, email, password, gender, dateOfBirth } = req.body;
        const userInfo = await User.create({
            name: name,
            email: email,
            password: password,
            gender: gender,
            dateOfBirth: dateOfBirth,
        });
        res.status(201).send({
            message: 'User created successfully',
            userInfo
        })} catch(err){

            return res.status(400).json(err.message );
        }
    

}