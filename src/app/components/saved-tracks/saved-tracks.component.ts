import { Component } from '@angular/core';
import { Song } from '../../Models/Song';
import { SpotifyService } from '../../services/spotify.service';
import {Observable, switchMap,} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { map } from 'rxjs/operators';
import {PlaylistService} from "../../services/playlist.service";


@Component({
  selector: 'app-saved-tracks',
  templateUrl: './saved-tracks.component.html',
  styleUrls: ['./saved-tracks.component.css'],

})
export class SavedTracksComponent {
  constructor(
    public spotifyService: SpotifyService,
  ) {}

  ngOnInit(){
    // @ts-ignore
    this.spotifyService.getSavedTracks().subscribe(
      (songs)=>this.spotifyService.updatePlaylistSongs(songs)
    )
  }
}
