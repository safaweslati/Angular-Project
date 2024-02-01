import { Component } from '@angular/core';
import { Song } from '../../Models/Song';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-saved-tracks',
  templateUrl: './saved-tracks.component.html',
  styleUrls: ['./saved-tracks.component.css'],
})
export class SavedTracksComponent {
  songs$!: Observable<Song[]>;
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.songs$ = this.spotifyService.getSavedTracks();
  }
}
