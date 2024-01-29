import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {spotifyConfiguration} from "../../config/constantes.config";
import {Observable} from "rxjs";
import {PlaylistResponse} from "../Models/PlaylistResponse";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }
  // @ts-ignore
  addPlaylist(userId: string | undefined,playlist) : Observable<PlaylistResponse>{
    const url = this.spotifyApiUrl+`/users/${userId}/playlists`;

    return this.http.post<any>(url,playlist);
  }

}
