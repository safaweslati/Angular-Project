import {Playlist} from "./Models/Playlist";
import {User} from "./Models/User";
import {Artist} from "./Models/Artist";
import {addMilliseconds, format} from "date-fns";
import {Song} from "./Models/Song";


export function SpotifyUser(user: any): User{

  return {
    id: user.id,
    name: user.display_name,
    imageUrl: getLastImageUrl(user.images),
  }
}

export function SpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist | null{
  if (!playlist || !playlist.id) {
    return null;
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: getLastImageUrl(playlist.images),
    songs: null,
  };
}

export function SpotifyPlaylistDetails(playlist: SpotifyApi.PlaylistObjectFull) : Playlist{
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: getFirstImageUrl(playlist.images),
    songs: playlist.tracks.items.map(item => SpotifyTrack(item.track)),
  };
}

export function SpotifyTrack(track: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull): Song {
  return {
    id: track.id,
    title: track.name,
    artists: 'artists' in track ? track.artists.map(artist => ({ id: artist.id, name: artist.name })) : [],
    album: {
      id: 'album' in track ? track.album.id : '',
      name: 'album' in track ? track.album.name : '',
      imageUrl: 'album' in track ? getFirstImageUrl(track.album.images) : "",
    },
    time: convertTime('duration_ms' in track ? track.duration_ms : 0),
    previewUrl: 'preview_url' in track ? track.preview_url : '',
  };
}


export function SpotifyArtist(artist: SpotifyApi.ArtistObjectFull): Artist {
  const sortedImages = artist.images
    .filter(image => image.width !== undefined)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  const imageUrl = sortedImages.length > 0 ? sortedImages.pop()?.url : undefined;
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: imageUrl || '',
  };
}


const convertTime = (timeMs: number) => {
  const date = addMilliseconds(new Date(0),timeMs);
  return format(date, "mm:ss")
}

function getLastImageUrl(images: SpotifyApi.ImageObject[] | undefined): string {
  return images && images.length > 0 ? images[images.length - 1].url : "";
}

function getFirstImageUrl(images: SpotifyApi.ImageObject[] | undefined, defaultValue: string = ""): string {
  return images && images.length > 0 ? images.shift()?.url || defaultValue : defaultValue;
}
