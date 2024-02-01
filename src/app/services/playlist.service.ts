import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { spotifyConfiguration } from '../../config/constantes.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}
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
  // @ts-ignore
  Check(reqBody) {
    const url = `${this.spotifyApiUrl}/me/tracks/contains?ids=${reqBody}`;
    return this.http.get<any>(url);
  }
}
