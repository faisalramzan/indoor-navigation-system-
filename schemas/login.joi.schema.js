const Joi = require('joi');
const loginValidationSchema   = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),

  });
  
  module.exports = {loginValidationSchema  };