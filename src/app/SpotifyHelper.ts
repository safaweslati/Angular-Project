import { Playlist } from './Models/Playlist';
import { User } from './Models/User';
import { Artist } from './Models/Artist';
import { addMilliseconds, format } from 'date-fns';
import { Song } from './Models/Song';
import { Audiobook } from './Models/audiobook';
import {
  AlbumsItem,
  ArtistsItem,
  AudiobooksItem,
  EpsiodesItem,
  ShowsItem,
} from './Models/spotifySearch';
import { Episode } from './Models/episode';
import { Show } from './Models/show';
import { Album } from './Models/album';

export function SpotifyUser(user: any): User {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: getLastImageUrl(user.images),
  };
}

export function SpotifyPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): Playlist | null {
  if (!playlist || !playlist.id) {
    return null;
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: getLastImageUrl(playlist.images),
    snapshot_id: playlist.snapshot_id,
    songs: null,
    owner: playlist.owner.id
  };
}
export function SpotifyPlaylistDetails(
  playlist: SpotifyApi.PlaylistObjectFull
): Playlist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: getFirstImageUrl(playlist.images),
    snapshot_id: playlist.snapshot_id,
    songs: playlist.tracks.items?.map((item) => SpotifyTrack(item.track)),
    owner: playlist.owner.id
  };
}

export function SpotifyTrack(
  track: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull
): Song {
  return {
    id: track.id,
    title: track.name,
    artists:
      'artists' in track
        ? track.artists.map((artist) => ({ id: artist.id, name: artist.name }))
        : [],
    album: {
      id: 'album' in track ? track.album.id : '',
      name: 'album' in track ? track.album.name : '',
      imageUrl: 'album' in track ? getFirstImageUrl(track.album.images) : '',
    },
    time: convertTime('duration_ms' in track ? track.duration_ms : 0),
    previewUrl: 'preview_url' in track ? track.preview_url : '',
    uri: track.uri,
  };
}


export function SpotifyArtist(artist: ArtistsItem): Artist {
  const sortedImages = artist.images
    .filter((image) => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl =
    sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: imageUrl || '',
    followers: null,
    images: null,
  };
}
export function SpotifyAlbum(album: AlbumsItem): Album {
  const sortedImages = album.images
    .filter((image) => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl =
    sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    id: album.id,
    total_tracks: album.total_tracks,
    imageUrl: imageUrl || '',
    release_date: album.release_date,
    name: album.name,
    artists: 'artists' in album ? album.artists.map((artist) => ({ id: artist.id, name: artist.name })) : []
  };
}
export function SpotifyEpisode(episode: EpsiodesItem): Episode {
  const sortedImages = episode.images
    .filter((image) => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl =
    sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    audio_preview_url: episode.audio_preview_url || '',
    description: episode.description,
    duration_ms: episode.duration_ms,
    id: episode.id,
    imageUrl: imageUrl || '',
    is_playable: episode.is_playable,
    name: episode.name,
    release_date: episode.release_date,
    resume_point: episode.resume_point,
  };
}

export function SpotifyAudiobook(audiobook: AudiobooksItem): Audiobook {
  const sortedImages = audiobook.images
    .filter((image) => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl =
    sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    id: audiobook.id,
    authors: audiobook.authors,
    edition: audiobook.edition,
    explicit: audiobook.explicit,
    imageUrl: imageUrl || '',
    name: audiobook.name,
    narrators: audiobook.narrators,
    total_chapters: audiobook.total_chapters,
  };
}

export function SpotifyShow(show: ShowsItem): Show {
  const sortedImages = show.images
    .filter((image) => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl =
    sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    id: show.id,
    imageUrl: imageUrl || '',
    name: show.name,
    publisher: show.publisher,
  };
}
const convertTime = (timeMs: number) => {
  const date = addMilliseconds(new Date(0), timeMs);
  return format(date, 'mm:ss');
};

function getLastImageUrl(images: SpotifyApi.ImageObject[] | undefined): string {
  return images && images.length > 0 ? images[images.length - 1].url : '';
}

function getFirstImageUrl(
  images: SpotifyApi.ImageObject[] | undefined,
  defaultValue: string = ''
): string {
  return images && images.length > 0
    ? images.shift()?.url || defaultValue
    : defaultValue;
}
