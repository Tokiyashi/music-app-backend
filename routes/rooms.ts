import {Router} from "express";
import RoomController from "../controllers/room";
import {roomCreateValidator, roomUpdateValidator} from "../schemes/room";
import {io} from "../socket";

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

  io.to('room1').emit('update room', value)
  res.send(room)
})
rooms.get('/', async (req, res) => {
  const userId = req.query?.userId.toString()

  const rooms = await RoomController.getAll(userId)

  res.send(rooms)
})

rooms.get('/:id', async (req, res) => {
  const id = req.params.id
  const room = await RoomController.getRoom(id)

  res.send(room)
})

rooms.delete('/:id', async (req, res) => {
  const id = req.params.id
  const room = await RoomController.deleteOne(id)

  res.send(room)
})

export default rooms