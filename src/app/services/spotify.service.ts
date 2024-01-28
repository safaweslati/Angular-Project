import { Injectable } from '@angular/core';
import {
  SpotifyArtist,
  SpotifyPlaylist,
  SpotifyPlaylistDetails,
  SpotifyTrack,
} from "../SpotifyHelper";
import {Playlist} from "../Models/Playlist";
import {Song} from "../Models/Song";
import {LoginService} from "./login.service";
import {Artist} from "../Models/Artist";
import {catchError, EMPTY, filter, map, Observable, switchMap} from "rxjs";
import {spotifyConfiguration} from "../../config/constantes.config";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
   private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(private http: HttpClient, private loginService: LoginService,private toastr: ToastrService) {}

  getUserPlaylists(userId: string | undefined, offset = 0, limit = 50): Observable<Playlist[]> {
    const url = this.spotifyApiUrl+`/users/${userId}/playlists?limit=${limit}&offset=${offset}` ;
    return this.http.get<any>(url).pipe(
      map(response => response.items.map((item: any) => SpotifyPlaylist(item))),
    );
  }

  getSavedTracks(offset = 0, limit = 50): Observable<Song[]> {
    const url = `${this.spotifyApiUrl}/me/tracks?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map(response => response.items.map((item: any) => SpotifyTrack(item.track))),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY
      }
    ));
  }

  getTopArtists(limit = 10): Observable<Artist[]> {
    const url = `${this.spotifyApiUrl}/me/top/artists?limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.items.map((item: any) => SpotifyArtist(item))),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY
      }
    ));
  }

  getPlaylistDetails(playlistId: string | null): Observable<Playlist> {
    const url = `${this.spotifyApiUrl}/playlists/${playlistId}`;
    return this.http.get<any>(url).pipe(
      map((playlistDetails) => SpotifyPlaylistDetails(playlistDetails)),
      catchError((error) => {
        this.toastr.error(`Access Token Expired`);
        return EMPTY
      })
    );
  }

  getFeaturedPlaylists(offset = 0, limit = 50) : Observable<Playlist[]>{
    const url= this.spotifyApiUrl + `/browse/featured-playlists?offset=${offset}&limit=${limit}` ;
    return this.http.get<any>(url).pipe(
      map(response => response.playlists.items.map((item: any) => SpotifyPlaylist(item)))
    , filter(Boolean),
    );
  }

  getCategoryPlaylists(category:string, offset = 0, limit = 50): Observable<Playlist[]> {
    const url = `${this.spotifyApiUrl}/browse/categories/${category}/playlists?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map(response => response.playlists.items.map((item: any) => SpotifyPlaylist(item))),
    );
  }


}
