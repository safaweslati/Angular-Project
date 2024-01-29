import {Component, OnInit} from '@angular/core';
import {faGuitar, faHome, faMusic, faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Playlist} from "../../Models/Playlist";
import {SpotifyService} from "../../services/spotify.service";
import {LoginService} from "../../services/login.service";
import {Observable, switchMap} from "rxjs";
import {Song} from "../../Models/Song";


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit{
  playlists$!: Observable<Playlist[]> ;
  savedTracks$! : Observable<Song[]>

  homeIcon= faHome;
  searchIcon = faSearch;
  artistIcon= faGuitar;
  playlistIcon= faMusic;
  signOutIcon= faSignOutAlt;


  constructor(public spotifyService: SpotifyService, public loginService: LoginService ) {
  }

   ngOnInit() {
      this.playlists$ = this.loginService.currentUser$.pipe(
        switchMap(user => this.spotifyService.getUserPlaylists(user?.id))
      );
      this.savedTracks$ = this.spotifyService.getSavedTracks()
  }

  logout() {
    this.loginService.logout();
  }


}
