import * as mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  name: String
}, {versionKey: false})
export const Room = mongoose.model('Track', trackSchema);