import { Component } from '@angular/core';
import {Artist} from "../../Models/Artist";
import {SpotifyService} from "../../services/spotify.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css']
})
export class TopArtistsComponent {

  artists$: Observable<Artist[]> = of([]);

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.artists$ = this.spotifyService.getTopArtists();
  }



}