import Joi from "@hapi/joi";

export const addTodo: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateTodo: Joi.ObjectSchema<any> = Joi.object({
  title: Joi.string().when("description", {
    is: !Joi.exist(),
    then: Joi.required(),
  }),
  description: Joi.string(),
});

export const getTodos: Joi.ObjectSchema<any> = Joi.object({
  page: Joi.number().positive().min(1).required(),
  limit: Joi.number().positive().min(1).max(100),
});