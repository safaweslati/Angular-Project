import {Song} from "./Song";

export interface Playlist{
  id: string,
  name: string,
  imageUrl: string,
  songs: Song[] | null;
}
