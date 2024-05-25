const Joi = require('joi');
const resetPasswordSchema   = Joi.object({
    password: Joi.string().min(6).required(),
    matchPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
      }),

  });
  
  module.exports = {resetPasswordSchema };