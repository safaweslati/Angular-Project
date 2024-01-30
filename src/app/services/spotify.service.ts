import { Injectable } from '@angular/core';
import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyAudiobook,
  SpotifyEpisode,
  SpotifyPlaylist,
  SpotifyPlaylistDetails,
  SpotifyShow,
  SpotifyTrack,
  SpotifyUser,
} from '../SpotifyHelper';
import { Playlist } from '../Models/Playlist';
import { Song } from '../Models/Song';
import { LoginService } from './login.service';
import { Artist } from '../Models/Artist';
import { spotifyConfiguration } from '../../config/constantes.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  APISearch,
  AlbumsItem,
  ArtistsItem,
  AudiobooksItem,
  EpsiodesItem,
  PlaylistsItem,
  ShowsItem,
  TracksItem,
} from '../Models/spotifySearch';
import {
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { User } from 'src/app/Models/User';
import { Episode } from '../Models/episode';
import { Show } from '../Models/show';
import { Audiobook } from '../Models/audiobook';
import { Album } from '../Models/album';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  getUserPlaylists(
    userId: string | undefined,
    offset = 0,
    limit = 50
  ): Observable<Playlist[]> {
    const url =
      this.spotifyApiUrl +
      `/users/${userId}/playlists?limit=${limit}&offset=${offset}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.items.map((item: any) => SpotifyPlaylist(item))
      ),
      catchError((error) => {
        this.toastr.error(`playlists`);
        return EMPTY;
      })
    );
  }

  getUserProfile(userId: string | undefined): Observable<User> {
    const url = this.spotifyApiUrl + `/users/${userId}`;

    return this.http.get<any>(url).pipe(
      tap((response) => console.log(response)),
      map((response) => SpotifyUser(response))
    );
  }

  getSavedTracks(offset = 0, limit = 50): Observable<Song[]> {
    const url = `${this.spotifyApiUrl}/me/tracks?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.items.map((item: any) => SpotifyTrack(item.track))
      ),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY;
      })
    );
  }

  getTopArtists(limit = 10): Observable<Artist[]> {
    const url = `${this.spotifyApiUrl}/me/top/artists?limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.items.map((item: any) => SpotifyArtist(item))),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY;
      })
    );
  }

  getPlaylistDetails(playlistId: string | null): Observable<Playlist> {
    const url = `${this.spotifyApiUrl}/playlists/${playlistId}`;
    return this.http.get<any>(url).pipe(
      map((playlistDetails) => SpotifyPlaylistDetails(playlistDetails)),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY;
      })
    );
  }
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
  getFeaturedPlaylists(offset = 0, limit = 50): Observable<Playlist[]> {
    const url =
      this.spotifyApiUrl +
      `/browse/featured-playlists?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.playlists.items.map((item: any) => SpotifyPlaylist(item))
      ),
      filter(Boolean)
    );
  }

  getCategoryPlaylists(
    category: string,
    offset = 0,
    limit = 50
  ): Observable<Playlist[]> {
    const url = `${this.spotifyApiUrl}/browse/categories/${category}/playlists?offset=${offset}&limit=${limit}`;
    return this.http
      .get<any>(url)
      .pipe(
        map((response) =>
          response.playlists.items.map((item: any) => SpotifyPlaylist(item))
        )
      );
  }
}
