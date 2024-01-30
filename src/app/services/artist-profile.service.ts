import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { spotifyConfiguration } from 'src/config/constantes.config';
import { Song } from '../Models/Song';
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '../SpotifyHelper';
import { Artist } from '../Models/Artist';
import { Album } from '../Models/album';

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
  getRelatedArtists(artistId: string | null): Observable<Artist[]> {
    const url = `${this.apiUrl}/artists/${artistId}/related-artists`;

    return this.http.get<any>(url).pipe(
      map((response) =>
        response.artists.map((artist: any) => SpotifyArtist(artist))
      ),
      catchError((error) => {
        console.error('Error fetching artists:', error);
        return EMPTY;
      })
    );
  }

  getArtistAlbums(artistId: string | null): Observable<Album[]> {
    const url = `${this.apiUrl}/artists/${artistId}/albums?include_groups=album,single,compilation,appears_on&offset=0&limit=20&locale=fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.items.map((album: any) => SpotifyAlbum(album))
      ),
      catchError((error) => {
        console.error('Error fetching albums:', error);
        return EMPTY;
      })
    );
  }
}
