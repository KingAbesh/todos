import Joi from "@hapi/joi";

export const register: Joi.ObjectSchema<any> = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match password" })
    .required(),
});

export const login: Joi.ObjectSchema<any> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});