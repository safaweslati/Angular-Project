import {Component, Input, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Artist} from "../../Models/Artist";

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.css']
})
export class PlaylistHeaderComponent {

  @Input() name: string = "";
  @Input() imageUrl : string = "";
  constructor() {
  }
}
