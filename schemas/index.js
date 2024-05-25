const { loginValidationSchema } = require('./login.joi.schema');
const { createUserSchema } = require('./create-user.joi.schema')
const { forgetPasswordSchema } = require('./forgot-password.joi.schema')
const { resetPasswordSchema } = require('./reset-password.joi.schema')

module.exports = {
    createUserSchema, loginValidationSchema, 
    forgetPasswordSchema,
    resetPasswordSchema
}