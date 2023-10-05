import * as mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  name: String,
  allTracks: [{
    url: String,
    name: String,
  }]

}, {versionKey: false})
export const Room = mongoose.model('Room', roomSchema);