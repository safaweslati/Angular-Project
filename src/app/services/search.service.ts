import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Artist } from '../Models/Artist';
import { Song } from '../Models/Song';
import { Playlist } from '../Models/Playlist';
import { Episode } from '../Models/episode';
import { Show } from '../Models/show';
import { Audiobook } from '../Models/audiobook';
import { Album } from '../Models/album';
import { spotifyConfiguration } from 'src/config/constantes.config';
import { HttpClient } from '@angular/common/http';
import {
  APISearch,
  AlbumsItem,
  ArtistsItem,
  AudiobooksItem,
  EpsiodesItem,
  ShowsItem,
} from '../Models/spotifySearch';
import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyAudiobook,
  SpotifyEpisode,
  SpotifyPlaylistDetails,
  SpotifyShow,
  SpotifyTrack,
} from '../SpotifyHelper';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(private http: HttpClient) {}

  searchForItems(
    term: string,
    offset = 5,
    limit = 10
  ): Observable<{
    artists: Artist[];
    tracks: Song[];
    playlists: Playlist[];
    episodes: Episode[];
    shows: Show[];
    audiobooks: Audiobook[];
    albums: Album[];
  }> {
    const url = `${this.spotifyApiUrl}/search?q=${term}&type=audiobook%2Cartist%2Calbum%2Cplaylist%2Cshow%2Ctrack%2Cepisode&offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response: APISearch) => {
        console.log(response.tracks);
        return {
          artists: response.artists.items.map((item: ArtistsItem) =>
            SpotifyArtist(item)
          ),
          tracks: response.tracks.items.map((item: any) => SpotifyTrack(item)),
          playlists: response.playlists.items.map((item: any) =>
            SpotifyPlaylistDetails(item)
          ),
          episodes: response.episodes.items.map((item: EpsiodesItem) =>
            SpotifyEpisode(item)
          ),
          shows: response.shows.items.map((item: ShowsItem) =>
            SpotifyShow(item)
          ),
          audiobooks: response.audiobooks.items.map((item: AudiobooksItem) =>
            SpotifyAudiobook(item)
          ),
          albums: response.albums.items.map((item: AlbumsItem) =>
            SpotifyAlbum(item)
          ),
        };
      })
    );
  }
}
