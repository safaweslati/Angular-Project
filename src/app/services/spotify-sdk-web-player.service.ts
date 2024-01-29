import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {PlayerState, track} from "../Models/player";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: { Player: any };
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpotifySdkWebPlayerService {
  spotifyPlayer!: any;
  state: PlayerState = {
    active: false,
    track: track,
    paused: true,
  };

  constructor() {
  }

  createWebPlayer(spotifyToken: string) {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });
    document.head.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log(
        'The Web Playback SDK is ready. We have access to Spotify.Player'
      );
      this.spotifyPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(spotifyToken);
        },
        volume: 0.5,
      });

      console.log(this.spotifyPlayer)
      this.spotifyPlayer.addListener('ready', ({device_id}: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
      });

      this.spotifyPlayer.addListener('not_ready', ({device_id}: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      this.spotifyPlayer.addListener('initialization_error', ({message}: { message: string }) => {
        console.error(message);
      });

      this.spotifyPlayer.addListener('authentication_error', ({message}: { message: string }) => {
        console.error(message);
      });

      this.spotifyPlayer.addListener('account_error', ({message}: { message: string }) => {
        console.error(message);
      });
      this.spotifyPlayer.addListener('player_state_changed', ((state: any) => {

        if (!state) {
          return;
        }

        this.state.track = state.track_window.current_track;
        this.state.paused = state.paused;

        this.spotifyPlayer.getCurrentState().then((state: any) => {
          (!state) ? this.state.active = false : this.state.active = true;
        });

      }));

      this.spotifyPlayer.connect();
    };
  }

  togglePlay() {
    console.log(this.spotifyPlayer)

    this.spotifyPlayer.togglePlay();
  }

  nextTrack() {
    console.log(this.spotifyPlayer)
    this.spotifyPlayer.nextTrack();
  }

  previousTrack() {
    console.log(this.spotifyPlayer)
    this.spotifyPlayer.previousTrack();
  }
}
