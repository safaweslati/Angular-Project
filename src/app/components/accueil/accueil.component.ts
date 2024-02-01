import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { map, Observable} from 'rxjs';
import { Playlist } from '../../Models/Playlist';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  popularPlaylistsAll$!: Observable<Playlist[]>;
  workoutPlaylistsAll$!: Observable<Playlist[]>;
  popPlaylistsAll$!: Observable<Playlist[]>;
  chillPlaylistsAll$!: Observable<Playlist[]>;

  constructor(private spotifyService: SpotifyService) {}
  ngOnInit(): void {
    this.popularPlaylistsAll$ = this.spotifyService.getFeaturedPlaylists();

    this.workoutPlaylistsAll$ = this.spotifyService
      .getCategoryPlaylists('workout')
      .pipe(map((playlists) => playlists.filter((p) => p !== null)));

    this.popPlaylistsAll$ = this.spotifyService.getCategoryPlaylists('pop');

    this.chillPlaylistsAll$ = this.spotifyService.getCategoryPlaylists('chill');
  }
}
