import * as Joi from "joi";

const track = Joi.object({
  url: Joi.string().required(),
  title: Joi.string().required(),
  _id: Joi.string().optional(),
  artistName: Joi.string().required(),
})

const user = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
})

export const playlistCreateValidator = Joi.object({
  name: Joi.string().required(),
  creatorId: Joi.string().required(),
  allTracks: Joi.array().items(track),
})

export const playlistUpdateValidator = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().required(),
  allTracks: Joi.array().items(track),
  creatorId: Joi.string().required(),
})

