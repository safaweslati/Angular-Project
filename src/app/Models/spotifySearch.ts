export interface APISearch {
  artists: Artists;
  tracks: Tracks;
  albums: Albums;
  playlists: Playlists;
  audiobooks: Audiobooks;
  episodes: Episodes;
  shows: Shows;
}

export interface Artists {
  href: string;
  items: ArtistsItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface ArtistsItem {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Tracks {
  href: string;
  items: TracksItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface TracksItem {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  type: PurpleType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single',
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum ReleaseDatePrecision {
  Day = 'day',
}
export enum Reason {
  market = 'market',
  product = 'product',
  explicit = 'explicit',
}
export interface ExternalIDS {
  isrc: string;
}

export enum PurpleType {
  Track = 'track',
}
export interface Albums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AlbumsItem[];
}
export interface AlbumsItem {
  album_type: PurpleType;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  images: Image[];
  id: string;
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  restrictions: Reason;
  type: AlbumTypeEnum.Album;
  uri: string;
  artists: Artist[];
}
export interface Playlists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistsItem[];
}

export interface PlaylistsItem {
  collaborative: boolean;
  description?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: Type.playlist;
  uri: string;
}

export interface PlaylistOwner {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: Type.user;
  uri: string;
  display_name: string;
}

export enum Type {
  user = 'user',
  playlist = 'playlist',
  show = 'show',
  episode = 'episode',
  audiobook = 'audiobook',
}

export interface PlaylistTracks {
  href: string;
  total: number;
}

export interface Shows {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ShowsItem[];
}
export interface ShowsItem {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: Type.show;
  url: string;
  total_episodes: number;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface Episodes {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: EpsiodesItem[];
}
export interface EpsiodesItem {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precisions: string;
  resume_point: { fully_played: boolean; resume_position_ms: number };
  type: Type.episode;
  uri: string;
  restrictions: Reason;
}
export interface Audiobooks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AudiobooksItem[];
}
export interface AudiobooksItem {
  authors: Author[];
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: Narrator[];
  publisher: string;
  type: Type.audiobook;
  uri: string;
  total_chapters: number;
}
export interface Author {
  name: string;
}
export interface Narrator {
  name: string;
}
