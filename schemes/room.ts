import * as Joi from "joi";

const track = Joi.object({
  url: Joi.string().required(),
  title: Joi.string().required(),
  id: Joi.string().required(),
  artistName: Joi.string().required(),
})

const user = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
})

export const roomCreateValidator = Joi.object({
  name: Joi.string().required(),
  creatorId: Joi.string().required(),
})

export const roomUpdateValidator = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().required(),
  allTracks: Joi.array().items(track),
  trackQueue: Joi.array().items(track),
  currentTrack: track.optional(),
  creatorId: Joi.string().required(),
  usersOnline: Joi.array().items(user),
})

