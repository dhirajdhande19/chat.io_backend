import Joi from 'joi';

export const validateRegister = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
}).required();

export const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
}).required();
