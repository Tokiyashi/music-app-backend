import * as Joi from "joi";

export const userCreateValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const userUpdateValidator = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const userLoginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
