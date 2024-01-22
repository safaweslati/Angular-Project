import {Component} from '@angular/core';
import {Song} from "../../Models/Song";
import {SpotifyService} from "../../services/spotify.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  songs: Song[] = [];
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getSongs();
  }

  async getSongs() {
    this.songs = await this.spotifyService.getMusic();
    console.log(this.songs);
  }

}
