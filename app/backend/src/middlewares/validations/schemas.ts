import * as Joi from 'joi';

const filled = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': filled,
    'string.empty': filled,
    'string.email': 'Invalid email or password',
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': filled,
    'string.empty': filled,
    'string.min': 'Invalid email or password',
  }),
});

export default {
  loginSchema,
};
