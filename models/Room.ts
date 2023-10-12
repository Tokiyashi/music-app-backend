import * as mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  name: String,
  creatorId: String,
  allTracks: [{
    url: String,
    title: String,
    artistName: String,
    id: String,
  }],
  trackQueue: [{
    url: String,
    title: String,
    artistName: String,
    id: String,
  }],
  currentTrack: {
    url: String,
    title: String,
    artistName: String,
    id: String,
  }
}, {versionKey: false})
export const Room = mongoose.model('Room', roomSchema);