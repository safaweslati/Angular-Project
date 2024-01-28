import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {map, Observable, take, tap} from "rxjs";
import {Playlist} from "../../Models/Playlist";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  popularPlaylists$! : Observable<Playlist[]>
  popularPlaylistsAll$!: Observable<Playlist[]>
  workoutPlaylists$! : Observable<Playlist[]>
  workoutPlaylistsAll$!: Observable<Playlist[]>
  popPlaylists$!  : Observable<Playlist[]>
  popPlaylistsAll$!  : Observable<Playlist[]>
  chillPlaylists$!  : Observable<Playlist[]>
  chillPlaylistsAll$!  : Observable<Playlist[]>

  constructor(private spotifyService: SpotifyService) {
  }
  ngOnInit(): void {
    this.popularPlaylistsAll$ = this.spotifyService.getFeaturedPlaylists();
    this.popularPlaylists$ = this.popularPlaylistsAll$.pipe(
      map(playlists => playlists.slice(0, 5))
    );

    this.workoutPlaylistsAll$ = this.spotifyService.getCategoryPlaylists('workout').pipe(
      map(playlists => playlists.filter(p => p !== null))
    );
    this.workoutPlaylists$ = this.workoutPlaylistsAll$.pipe(
      map(playlists => playlists.slice(0, 5))
    );

    this.popPlaylistsAll$ = this.spotifyService.getCategoryPlaylists('pop');
    this.popPlaylists$ = this.popPlaylistsAll$.pipe(
      map(playlists => playlists.slice(0, 5))
    );

    this.chillPlaylistsAll$ = this.spotifyService.getCategoryPlaylists('chill');
    this.chillPlaylists$ = this.chillPlaylistsAll$.pipe(
      map(playlists => playlists.slice(0, 5))
    );
  }

}
