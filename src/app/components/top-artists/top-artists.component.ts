import { Component } from '@angular/core';
import {Artist} from "../../Models/Artist";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css']
})
export class TopArtistsComponent {

  artists: Artist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtists();
  }
  async getTopArtists(){
    this.artists = await this.spotifyService.getTopArtists();
  }
}
