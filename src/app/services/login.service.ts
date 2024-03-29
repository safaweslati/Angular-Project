import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { spotifyConfiguration } from '../../config/constantes.config';
import { SpotifyUser } from '../SpotifyHelper';
import {BehaviorSubject, map, Observable, switchMap, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLogged$: Observable<boolean> = this.currentUserSubject.pipe(
    map((user) => !!user)
  );
  private spotifyApiUrl = spotifyConfiguration.spotifyApiBaseUrl;

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (storedUser && token) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.startTokenExpirationTimer();
    }
  }

  private startTokenExpirationTimer() {
    const expirationTime = parseInt(localStorage.getItem('expires_at') || '0', 10);
    const expiresIn = expirationTime - Date.now();
    if (expiresIn > 0) {
       setTimeout(() => {
        this.logout();
      }, expiresIn);
    }
    else this.logout();
  }


  getLoginUrl() {
    const authEndPoint = `${spotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${spotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${spotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${spotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  getToken() {
    console.log(window.location.hash);
    if (!window.location.hash) return '';
    const params = window.location.hash.substring(1).split('&');
    console.log(params);
    return params[0].split('=')[1];
  }

  handleLogin() {
    const token = this.getToken();
    if(token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('expires_at', (Date.now() + (3600 - 60) * 1000).toString());
      this.startTokenExpirationTimer();
      this.getSpotifyUser();
    }
  }

  getSpotifyUser() {
    this.http.get(this.spotifyApiUrl + '/me').subscribe((userInfo) => {
      console.log('this is user info');
      console.log(userInfo);
      const user = SpotifyUser(userInfo);
      this.currentUserSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home/accueil']);
    });
  }


  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
