import {Track} from "./track";

export type Playlist = {
  _id: string,
  name: string,
  creatorId: string,
  allTracks: Track[],
}