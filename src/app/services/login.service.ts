import { Injectable } from '@angular/core';
import Spotify from "spotify-web-api-js";
import {User} from "../Models/User";
import {Router} from "@angular/router";
import {spotifyConfiguration} from "../../config/constantes.config";
import {SpotifyUser} from "../SpotifyHelper";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private spotifyApi : Spotify.SpotifyWebApiJs
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLogged$ : Observable<boolean> = this.currentUserSubject.pipe(map(user => !!user));


  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (storedUser && token) {
      this.spotifyApi.setAccessToken(token);
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getLoginUrl(){
    const authEndPoint = `${spotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${spotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${spotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${spotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  getToken(){
    console.log(window.location.hash);
    if(!window.location.hash)
      return '';
    const params = window.location.hash.substring(1).split('&')
    console.log(params)
    return params[0].split('=')[1]
  }

   async handleLogin() {
    const token = this.getToken();
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('access_token', token)
    await this.getSpotifyUser();
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe()
    const user = SpotifyUser(userInfo);
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  getSpotify(){
    return this.spotifyApi;
  }

}
