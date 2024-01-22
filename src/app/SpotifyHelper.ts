import {Playlist} from "./Models/Playlist";
import {User} from "./Models/User";
import {Artist} from "./Models/Artist";
import {addMilliseconds, format} from "date-fns";


export function SpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): User{
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images && user.images.length > 0 ? user.images[user.images.length - 1].url : ""
  }
}

export function SpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist{
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images && playlist.images.length > 0 ? playlist.images[playlist.images.length - 1].url : ""
  };
}

export function SpotifyArtist(artist: SpotifyApi.ArtistObjectFull): Artist {
  const sortedImages = artist.images
    .filter(image => image.width !== undefined) // Exclude images with undefined width
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

export function SpotifyTrack(track: SpotifyApi.TrackObjectFull) {
  const albumImages = track.album.images;

  return {
    id: track.id,
    title: track.name,
    album: {
      id: track.album.id,
      imageUrl: albumImages && albumImages.length > 0 ? albumImages.shift()?.url : 'defaultImageUrl',
      name: track.album.name,
    },
    artists: track.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: convertTime(track.duration_ms),
    previewUrl: track.preview_url
  };
}

