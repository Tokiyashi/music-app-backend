import {Track} from "./track";

export type Room = {
  name: string;
  _id: string;
  allTracks: Track[];
  trackQueue: Track[];
  currentTrack: Track;
  creatorId: string;
  usersOnline: { name: string, _id: string }[];
}