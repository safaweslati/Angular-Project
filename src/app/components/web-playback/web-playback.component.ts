import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {SpotifySdkWebPlayerService} from "../../services/spotify-sdk-web-player.service";
import {PlayerState, track} from "../../Models/player";

declare global {
  interface window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
  }
}

@Component({
  selector: 'app-web-playback',
  templateUrl: './web-playback.component.html',
  styleUrls: ['./web-playback.component.css']
})
export class WebPlaybackComponent implements OnInit {
  playerState: PlayerState  = {
    active: false,
    track: track,
    paused: true,
  };
  playerState_interval:any;
  spotifyPlayer: any;
  constructor(private spotifyAuth: LoginService,
              private spotifyWebSDK: SpotifySdkWebPlayerService
  ) {
  }

  ngOnInit(): void {
    let token:string= localStorage.getItem('access_token') || '';
    console.log(token)
    this.spotifyWebSDK.createWebPlayer(token);
    this.loadPlayerState();

    this.playerState_interval = setInterval(() => {
      this.loadPlayerState()
      console.log(this.playerState)
      //todo: refactor observable

    }, 5000);
    this.spotifyPlayer = this.spotifyWebSDK.spotifyPlayer;
    console.log(this.spotifyPlayer)
    console.log(this.spotifyWebSDK.spotifyPlayer)
  }

  loadPlayerState(){
        this.playerState = this.spotifyWebSDK.state;
  }
  togglePlay() {
    console.log(this.spotifyPlayer)

    this.spotifyWebSDK.togglePlay();
  }

  nextTrack() {
    console.log(this.spotifyPlayer)
    this.spotifyWebSDK.nextTrack();
  }

  previousTrack() {
    console.log(this.spotifyPlayer)
    this.spotifyWebSDK.previousTrack();
  }
}
