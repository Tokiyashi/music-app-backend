import {Router} from "express";
import RoomController from "../controllers/room";
import {roomCreateValidator, roomUpdateValidator} from "../schemes/room";

const rooms = Router()
rooms.post('/', async (req, res) => {
  const {error, value} = roomCreateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const room = await RoomController.create(value)
  res.send(room)
})

rooms.put('/', async (req, res) => {
  const {error, value} = roomUpdateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }
  const room = await RoomController.update(value._id, value)

  res.send(room)
})
rooms.get('/', async (req, res) => {
  const userId = req.query?.userId.toString()

  const rooms = await RoomController.getAll(userId)

  res.send(rooms)
})

rooms.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!id.match(/^[0-9a-fA-F]{24}$/) || id.length !== 24) {
    res.status(400).send({error: "Invalid room ID"})
    return
  }

  try {
    const room = await RoomController.getRoom(id)
    if (!room) {
      res.sendStatus(404)
      return
    }
    res.send(room)
  } catch (err) {
    res.status(400).send({error: "Invalid room ID"})
  }

})

rooms.delete('/:id', async (req, res) => {
  const id = req.params.id
  const room = await RoomController.deleteOne(id)

  res.send(room)
})

export default rooms