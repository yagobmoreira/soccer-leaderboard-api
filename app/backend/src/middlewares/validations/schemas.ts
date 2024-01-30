import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': 'All fields must be filled',
  }),
});

export default {
  loginSchema,
};
