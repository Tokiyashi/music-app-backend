import * as mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: String,
  creatorId: String,
  allTracks: [{
    url: String,
    title: String,
    artistName: String,
    id: String,
  }],
}, {versionKey: false})
export const Playlist = mongoose.model('Playlist', playlistSchema);