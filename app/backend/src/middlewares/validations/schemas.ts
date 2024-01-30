import * as Joi from 'joi';

const filled = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': filled,
    'string.empty': filled,
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': filled,
    'string.empty': filled,
  }),
});

export default {
  loginSchema,
};
