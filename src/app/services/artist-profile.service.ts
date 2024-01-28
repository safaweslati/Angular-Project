import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { spotifyConfiguration } from 'src/config/constantes.config';
import { Song } from '../Models/Song';

@Injectable({
  providedIn: 'root',
})
export class ArtistProfileService {
  private apiUrl = spotifyConfiguration.spotifyApiBaseUrl;
  constructor(private http: HttpClient) {}

  /*
  getArtistDetails(artistId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/artists/${artistId}`);
  }*/
  getArtistDetails(artistId: string): Observable<any> {
    const url = `${this.apiUrl}/artists/${artistId}`;

    return this.http.get<any>(url);
  }
  getArtistInfo(artistHref: string): Observable<any> {
    const token = localStorage.getItem('access_token');

    // Ajoutez le token à l'en-tête de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Effectuez la requête avec le token dans l'en-tête
    return this.http.get(artistHref, { headers });
  }

  getTopTracks(artistId: string): Observable<Song[]> {
    const url = `${this.apiUrl}/artists/${artistId}/top-tracks?country=US`;

    return this.http.get<any>(url).pipe(
      map((response) =>
        response.tracks.map((track: any) => this.convertToSong(track))
      ),
      catchError((error) => {
        // Gérez les erreurs ici selon vos besoins
        console.error('Error fetching top tracks:', error);
        return EMPTY;
      })
    );
  }
  private convertToSong(track: any): Song {
    return {
      id: track.id,
      title: track.name,
      artists: track.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
      })),
      album: {
        id: track.album.id,
        name: track.album.name,
        imageUrl:
          track.album.images.length > 0 ? track.album.images[0].url : undefined,
      },
      time: this.formatTime(track.duration_ms),
      previewUrl: track.preview_url,
      addedAt: track.added_at, // Vous devrez peut-être ajuster cela en fonction de votre réponse Spotify
    };
  }

  // Ajoutez cette fonction pour formater la durée de la piste
  private formatTime(duration_ms: number): string {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
  }
}
