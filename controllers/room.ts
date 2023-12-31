import {Room} from "../models/Room";
import {Room as RoomType} from "../types/room";
import {io} from "../socket";
import mongoose from "mongoose";

const RoomController = {

  getRoom: async (id: string): Promise<RoomType> => {
    try {
      const room = await Room.findById(id)
      return room?.toObject()
    } catch (e) {
      console.error(e)
      return null
    }
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
    const tracksWithIds = value.allTracks.map(track => !track._id ? {
      ...track,
      _id: new mongoose.Types.ObjectId()
    } : track)
    const newRoom = {...value, allTracks: tracksWithIds}
    const room = await Room.findByIdAndUpdate(id, newRoom)
    io.to(newRoom._id.toString()).emit('update room', newRoom)

    console.log(newRoom._id.toString(), 'Получено сообщение в комнате', newRoom.name)

    return room
  }
}
export default RoomController