import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { spotifyConfiguration } from '../../config/constantes.config';
import {BehaviorSubject, map, Observable, of, switchMap} from 'rxjs';
import {Playlist} from "../Models/Playlist";
import {LoginService} from "./login.service";
import {Song} from "../Models/Song";

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;
  private playlistDetailsSubject = new BehaviorSubject<Playlist | null>(null);
  public playlistDetails$ = this.playlistDetailsSubject.asObservable();
  public playlistsSubject= new BehaviorSubject<Playlist[] | null>(null);
  public playlists$ = this.playlistsSubject.asObservable();
  constructor(private http: HttpClient, private toastr: ToastrService, private loginService: LoginService) {}
  // @ts-ignore
  addPlaylist(userId: string | undefined, playlist): Observable<any> {
    const url = this.spotifyApiUrl + `/users/${userId}/playlists`;
    return this.http.post<any>(url, playlist);
  }
  // @ts-ignore
  AddItem(item, playlist_id: String) {
    const url = `${this.spotifyApiUrl}/playlists/${playlist_id}/tracks`;
    return this.http.post<any>(url, item);
  }
  // @ts-ignore
  DeleteItem(playlistId: string, item): Observable<any> {
    const url = `${this.spotifyApiUrl}/playlists/${playlistId}/tracks`;
    console.log(item);
    return this.http.delete<any>(url, { body: item });
  }
  // @ts-ignore
  SaveTracks(reqBody) {
    const url = `${this.spotifyApiUrl}/me/tracks`;
    return this.http.put<any>(url, reqBody);
  }
  // @ts-ignore
  RemoveSavedTrack(reqBody) {
    const url = `${this.spotifyApiUrl}/me/tracks?ids=${reqBody}`;
    return this.http.delete<any>(url);
  }
  updatePlaylistDetails(updatedDetails: Playlist) {
    this.playlistDetailsSubject.next(updatedDetails);
  }
  updatePlaylists(updatedDetails: Playlist[]) {
    // @ts-ignore
    this.playlistsSubject.next(updatedDetails);
  }

  // @ts-ignore
  Check(reqBody){
    const url = `${this.spotifyApiUrl}/me/tracks/contains?ids=${reqBody}`;
    return this.http.get<any>(url);
  }

  isCurrentUserOwner(playlist: Playlist): Observable<boolean> {
    return this.loginService.currentUser$.pipe(
      switchMap((user) => {
        const currentUserId = user?.id;
        return of(currentUserId === playlist.owner);
      })
    );
  }

  isSongInPlaylist(song: Song): Observable<boolean | undefined> {
    return this.playlistDetails$.pipe(
      map((playlistDetails) => playlistDetails?.songs?.some((track) => track.id === song.id))
    );
  }
}
