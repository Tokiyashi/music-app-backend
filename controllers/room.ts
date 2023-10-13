import {Room} from "../models/Room";
import {Room as RoomType} from "../types/room";
import {io} from "../socket";

const RoomController = {
  getRoom: async (id: string): Promise<RoomType> => {
    const room = await Room.findById(id)

    return room?.toObject()
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
    const room = await Room.create({...value, allTracks: [], trackQueue: [], usersOnline: []})

    return room
  },

  update: async (id: string, value: RoomType) => {
    const room = await Room.findByIdAndUpdate(id, value)
    io.to(value._id.toString()).emit('update room', value)

    console.log(value._id.toString(), 'Получено сообщение в комнате', value.name)

    return room
  }
}
export default RoomController