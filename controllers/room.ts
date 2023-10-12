import {Room} from "../models/Room";

const RoomController = {
  getRoom: async (id: string) => {
    const room = await Room.findById(id)

    return room
  },

  getAll: async (userId: string) => {
    const rooms = await Room.find({creatorId: userId})

    return rooms
  },

  deleteOne: async (id: string) => {
    const room = await Room.findByIdAndDelete(id)

    return room
  },

  create: async (value: typeof Room) => {
    const room = await Room.create({...value, allTracks: [], trackQueue: []})
    console.log(room)
    return room
  },

  update: async (id: string, value: typeof Room) => {
    const room = await Room.findByIdAndUpdate(id, value)

    return room
  }
}
export default RoomController