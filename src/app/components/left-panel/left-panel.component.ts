import {Component, OnInit} from '@angular/core';
import {faGuitar, faHome, faMusic, faPlus, faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Playlist} from "../../Models/Playlist";
import {SpotifyService} from "../../services/spotify.service";
import {LoginService} from "../../services/login.service";
import {Observable, switchMap} from "rxjs";
import {Song} from "../../Models/Song";
import {Router} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  playlists$!: Observable<Playlist[]>;
  savedTracks$!: Observable<Song[]>;
  newPlaylist = {
    "name": "New Playlist",
    "description": "New playlist description",
    "public": false
  };

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;
  signOutIcon = faSignOutAlt;
  addIcon = faPlus;


  constructor(
    public spotifyService: SpotifyService,
    public loginService: LoginService,
    public playlistService:PlaylistService,
    public router:Router
    ) {
  }

  ngOnInit() {
    this.playlists$ = this.getPlaylists();
    this.savedTracks$ = this.spotifyService.getSavedTracks()
  }


  addPlaylist() {
    // @ts-ignore
    this.loginService.currentUser$.pipe(
      switchMap(user => this.playlistService.addPlaylist(user?.id, this.newPlaylist))
    ).subscribe(
       () => this.playlists$ = this.getPlaylists()
    );

    return this.router.navigate(['home/playlists']);
  }

  private getPlaylists(){
    return this.loginService.currentUser$.pipe(
      switchMap(user => this.spotifyService.getUserPlaylists(user?.id))
    );
  }

  logout() {
    this.loginService.logout();
  }

}
