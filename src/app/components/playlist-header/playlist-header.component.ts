import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../Models/Artist';
@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.css'],
})
export class PlaylistHeaderComponent {
  @Input() name: string = '';
  @Input() followers: number | string = '';
  @Input() imageUrl: string = '';
  @Input() verified: boolean = false;

  constructor() {}
}
