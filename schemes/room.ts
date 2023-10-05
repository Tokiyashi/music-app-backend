import * as Joi from "joi";

export const roomCreateValidator = Joi.object({
  name: Joi.string().required(),
})

export const roomUpdateValidator = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().required(),
  allTracks: Joi.array(),
})

