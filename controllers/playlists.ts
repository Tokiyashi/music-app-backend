import {io} from "../socket";
import mongoose from "mongoose";
import {Playlist} from "../models/Playlist";
import {Playlist as PlaylistType} from "../types/playlist";

const PlaylistController = {

  getOne: async (id: string) => {
    try {
      const room = await Playlist.findById(id)
      return room?.toObject()
    } catch (e) {
      console.error(e)
      return null
    }
  },

  getAll: async (creatorId: string) => {
    const rooms = await Playlist.find({creatorId})

    return rooms
  },

  deleteOne: async (id: string) => {
    const room = await Playlist.findByIdAndDelete(id)

    return room
  },

  create: async (value: PlaylistType) => {
    const room = await Playlist.create({...value, allTracks: [], trackQueue: [], usersOnline: []})

    return room
  },

  update: async (id: string, value: PlaylistType) => {
    const tracksWithIds = value.allTracks.map(track => !track._id ? {
      ...track,
      _id: new mongoose.Types.ObjectId()
    } : track)
    const newRoom = {...value, allTracks: tracksWithIds}
    const room = await Playlist.findByIdAndUpdate(id, newRoom)
    io.to(newRoom._id.toString()).emit('update room', newRoom)

    console.log(newRoom._id.toString(), 'Получено сообщение в комнате', newRoom.name)

    return room
  }
}
export default PlaylistController