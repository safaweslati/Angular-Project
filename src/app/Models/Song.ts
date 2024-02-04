
export interface Song {
  id: string;
  title: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  time: string;
  previewUrl: string;
  addedAt?: string;
  uri?: string;
  isLiked?:Boolean
}
