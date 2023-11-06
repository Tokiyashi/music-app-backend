import {Router} from "express";
import {playlistCreateValidator, playlistUpdateValidator} from "../schemes/playlist";
import PlaylistController from "../controllers/playlists";

const playlists = Router()
playlists.post('/', async (req, res) => {
  const {error, value} = playlistCreateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const result = await PlaylistController.create(value)
  res.send(result)
})

playlists.put('/', async (req, res) => {
  const {error, value} = playlistUpdateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }
  const result = await PlaylistController.update(value._id, value)

  res.send(result)
})
playlists.get('/', async (req, res) => {
  const creatorId = req.query?.creatorId.toString()

  const rooms = await PlaylistController.getAll(creatorId)

  res.send(rooms)
})

playlists.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!id.match(/^[0-9a-fA-F]{24}$/) || id.length !== 24) {
    res.status(400).send({error: "Invalid room ID"})
    return
  }

  try {
    const room = await PlaylistController.getOne(id)
    if (!room) {
      res.sendStatus(404)
      return
    }
    res.send(room)
  } catch (err) {
    res.status(400).send({error: "Invalid room ID"})
  }

})

playlists.delete('/:id', async (req, res) => {
  const id = req.params.id
  const room = await PlaylistController.deleteOne(id)

  res.send(room)
})

export default playlists