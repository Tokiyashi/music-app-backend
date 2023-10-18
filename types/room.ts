type Track = {
  url: string;
  title: string;
  artistName: string;
  _id: string;
}

export type Room = {
  name: string;
  _id: string;
  allTracks: Track[];
  trackQueue: Track[];
  currentTrack: Track;
  creatorId: string;
  usersOnline: { name: string, _id: string }[];
}