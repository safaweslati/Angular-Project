import {Component, Input} from '@angular/core';
import {Playlist} from "../../Models/Playlist";
import { Router} from "@angular/router";

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.css']
})
export class PlaylistGridComponent {
  @Input() playlists!: Playlist[];

  constructor(private router: Router) {
  }
  navigateToPlaylist(id: string) {
    this.router.navigate(['/home/playlist',id])
  }
}
