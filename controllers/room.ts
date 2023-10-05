import {Room} from "../models/Room";

const RoomController = {
  getRoom: async (id: string) => {
    const room = await Room.findById(id)

    return room
  },

  getAll: async () => {
    const rooms = await Room.find({})

    return rooms
  },

  create: async (value: typeof Room) => {
    const room = await Room.create(value)

    return room
  },

  update: async (id: string, value: typeof Room) => {
    const room = await Room.findByIdAndUpdate(id, value)

    return room
  }
}
export default RoomController