import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Artist} from "../../Models/Artist";

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.css']
})
export class TopArtistComponent implements OnInit{

  topArtist!: Artist
  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.getArtists();
  }

  async getArtists() {
    const artists = await this.spotifyService.getTopArtists(1);
    if (artists && artists.length > 0) {
      this.topArtist = artists[0];
      console.log(this.topArtist)
    }
  }

}
