import { Component } from '@angular/core';
import { Song } from '../../Models/Song';
import { SpotifyService } from '../../services/spotify.service';
import {Observable,} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-saved-tracks',
  templateUrl: './saved-tracks.component.html',
  styleUrls: ['./saved-tracks.component.css'],

})
export class SavedTracksComponent {
  songs$!: Observable<Song[]>;
  constructor(
    public activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.songs$ = this.activatedRoute.data.pipe(
      map((data) => data['savedTracks']),
    );
  }
}
