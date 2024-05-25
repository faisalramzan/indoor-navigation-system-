const Joi = require('joi');
const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    matchPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.date().less('now').required(),
  });
  
  module.exports = {createUserSchema};