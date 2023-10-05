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
  console.log('123')
  const rooms = await RoomController.getAll()

  res.send('asd')
})

rooms.get('/:id', async (req, res) => {
  const id = req.params.id
  const room = await RoomController.getRoom(id)
  console.log(room.toObject())
  res.send(room)
})


export default rooms