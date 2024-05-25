const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserSchema,
    loginValidationSchema,
    forgetPasswordSchema,
    resetPasswordSchema
} = require('../schemas/index');
const validate  = require('../middlewars/validate');
const authController = require('../controllers/authController');

///Router
router.post('/', validate(createUserSchema),userController.create);
router.post('/login', validate(loginValidationSchema), authController.login);
router.post('/forgotPassword', validate(forgetPasswordSchema), authController.forgetPassword)
router.post('/resetPassword/:token', validate(resetPasswordSchema), authController.resetPassword); // Route for password reset
//router.get('/',userController.)

module.exports = router;