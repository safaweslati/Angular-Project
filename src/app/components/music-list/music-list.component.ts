import { Component, Input, OnDestroy } from '@angular/core';
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Song } from '../../Models/Song';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css'],
})
export class MusicListComponent {
  @Input() songs: Song[] | null = [];
  clockIcon = faClock;
  playIcon = faPlay;
  displayedSongs: any[] = [];
  showMore: boolean = false;

  constructor(public playerService: PlayerService) {}

  ngOnChanges(): void {
    this.displayedSongs = this.songs ? this.songs.slice(0, 5) : [];
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedSongs = this.songs ? this.songs : []; // Show all songs
    } else {
      this.displayedSongs = this.showMore
        ? this.songs || []
        : this.songs
        ? this.songs.slice(0, 5)
        : []; // Show only the first 5 songs
    }
  }

  getArtists(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
  }

  PlaySong(song: Song) {
    this.playerService.playMusic(song);
  }
}
