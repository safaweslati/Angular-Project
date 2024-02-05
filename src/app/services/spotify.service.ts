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
import {
  APISearch,
  AlbumsItem,
  ArtistsItem,
  AudiobooksItem,
  EpsiodesItem,
  ShowsItem,
} from '../Models/spotifySearch';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { spotifyConfiguration } from '../../config/constantes.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  public playlistSongsSubject= new BehaviorSubject<Song[] | null>(null);
  public playlistSongs$ = this.playlistSongsSubject.asObservable();

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
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }
  updatePlaylistSongs(updatedDetails: Song[]) {
    this.playlistSongsSubject.next(updatedDetails);
  }
  getFollowedArtists(): Observable<Artist[]> {
    const url = this.spotifyApiUrl + `/me/following?type=artist`;
    return this.http.get<any>(url).pipe(
      tap((response) => console.log(response)),
      map((response) =>
        response.artists.items.map((item: any) => SpotifyArtist(item))
      ),
      catchError((error) => {
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }

  getUserProfile(userId: string | undefined): Observable<User> {
    const url = this.spotifyApiUrl + `/users/${userId}`;

    return this.http.get<any>(url).pipe(
      tap((response) => console.log(response)),
      map((response) => SpotifyUser(response)),
      catchError((error) => {
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }

  // @ts-ignore
  getSavedTracks(offset = 0, limit = 50): Observable<Song[]> {
    const url = `${this.spotifyApiUrl}/me/tracks?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
          response.items.map((item: any) => SpotifyTrack(item.track))
      ),
      catchError((error) => {
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }


  getTopArtists(limit = 10): Observable<Artist[]> {
    const url = `${this.spotifyApiUrl}/me/top/artists?limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.items.map((item: any) => SpotifyArtist(item))),
      catchError((error) => {
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }

  getPlaylistDetails(playlistId: string | null): Observable<Playlist> {
    const url = `${this.spotifyApiUrl}/playlists/${playlistId}`;
    return this.http.get<any>(url).pipe(
      map((playlistDetails) => SpotifyPlaylistDetails(playlistDetails)),
      catchError((error) => {
        this.toastr.error(`Error fetching data from the API`);
        return EMPTY;
      })
    );
  }

  searchForItems(
    term: string,
    offset = 0,
    limit = 50
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
  searchForSongs(
    term: string,
    offset = 5,
    limit = 10
  ): Observable<{ tracks: Song[]; }> {
    const url = `${this.spotifyApiUrl}/search?q=${term}&type=track&offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response: APISearch) => {
        console.log(response);
        return {
          tracks: response.tracks.items.map((item: any) => SpotifyTrack(item)),
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

  getAlbumtDetails(albumId: string | null): Observable<Album> {
    const url = `${this.spotifyApiUrl}/albums/${albumId}`;

    return this.http.get<AlbumsItem>(url)
    .pipe(
      map(album => SpotifyAlbum(album))
    );

  }
  getAlbumTracks(albumId: string | null): Observable<Song[]> {
    const url = `${this.spotifyApiUrl}/albums/${albumId}/tracks`;
    console.log("fel album tracks" );

    return this.http.get<any>(url).pipe(
      map((response) =>{
      const items = response.items || [];
      return items.map((track: any) => SpotifyTrack(track));
  }),
      catchError((error) => {
        console.error('Error fetching top tracks:', error);
        return EMPTY;
      })
    );
  }
}
