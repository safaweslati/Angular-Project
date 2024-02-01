import { Song } from './Song';

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  snapshot_id: string;
  songs: Song[] | null;
}
