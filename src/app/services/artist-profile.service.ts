import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { spotifyConfiguration } from 'src/config/constantes.config';
import { Song } from '../Models/Song';
import { SpotifyTrack } from '../SpotifyHelper';
import { Artist } from '../Models/Artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistProfileService {
  private apiUrl = spotifyConfiguration.spotifyApiBaseUrl;
  constructor(private http: HttpClient) {}
  getArtistDetails(artistId: string | null): Observable<any> {
    const url = `${this.apiUrl}/artists/${artistId}`;

    return this.http.get<any>(url);
  }

  getTopTracks(artistId: string | null): Observable<Song[]> {
    const url = `${this.apiUrl}/artists/${artistId}/top-tracks?country=US`;

    return this.http.get<any>(url).pipe(
      map((response) =>
        response.tracks.map((track: any) => SpotifyTrack(track))
      ),
      catchError((error) => {
        console.error('Error fetching top tracks:', error);
        return EMPTY;
      })
    );
  }
}
