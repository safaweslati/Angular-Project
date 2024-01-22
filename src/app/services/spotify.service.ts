import { Injectable } from '@angular/core';
import {spotifyConfiguration} from "../../config/constantes.config";
import Spotify from "spotify-web-api-js";
import {User} from "../Models/User";
import {SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUser} from "../SpotifyHelper";
import {Playlist} from "../Models/Playlist";
import {Router} from "@angular/router";
import {Song} from "../Models/Song";
import {LoginService} from "./login.service";
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private spotifyApi : Spotify.SpotifyWebApiJs

  constructor(private loginService: LoginService) {
    this.spotifyApi = this.loginService.getSpotify();
  }


  async getUserPlaylists(offset = 0, limit = 50): Promise<Playlist[]> {
    let userId;
    this.loginService.currentUser$.subscribe(user => {
      userId = user?.id
    })
    const playlists = await this.spotifyApi.getUserPlaylists(userId, {limit})
    return playlists.items.map(x => SpotifyPlaylist(x))
  }

  async getTopArtists(limit=10){
    const artists = await this.spotifyApi.getMyTopArtists({limit});
    return artists.items.map(x => SpotifyArtist(x));
  }

  async getMusic(offset=0 , limit=50): Promise<Song[]>{
    const tracks =  await this.spotifyApi.getMySavedTracks({offset,limit});
    console.log(tracks)
    return tracks.items.map(x => SpotifyTrack(x.track));
  }

}
