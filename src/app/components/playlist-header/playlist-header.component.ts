import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../Models/Artist';
import {faPen, faSearch} from "@fortawesome/free-solid-svg-icons";
import {PlaylistService} from "../../services/playlist.service";
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

  constructor(
    private playlistService : PlaylistService,
  ) {}

  protected readonly faSearch = faSearch;
}
