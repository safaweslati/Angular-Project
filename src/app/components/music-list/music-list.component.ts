import {Component, Input, OnDestroy} from '@angular/core';
import {faClock, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Song} from "../../Models/Song";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent {
  @Input() songs: Song[] | null = [];
  clockIcon = faClock;
  playIcon = faPlay;


  constructor(public playerService: PlayerService) {
  }

  getArtists(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
  }

  PlaySong(song: Song) {
    this.playerService.playMusic(song)
  }


}
