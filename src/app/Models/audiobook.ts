import { Author, Narrator } from './spotifySearch';

export interface Audiobook {
  authors: Author[];
  edition: string;
  explicit: boolean;
  id: string;
  imageUrl: any;
  name: string;
  narrators: Narrator[];
  total_chapters: number;
}
