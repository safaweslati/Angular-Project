import {Component, OnInit} from '@angular/core';
import {faGuitar, faHome, faMusic, faPlus, faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Playlist} from "../../Models/Playlist";
import {SpotifyService} from "../../services/spotify.service";
import {LoginService} from "../../services/login.service";
import {Observable, switchMap} from "rxjs";
import {Song} from "../../Models/Song";
import {Router} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  playlists$!: Observable<Playlist[]>;
  savedTracks$!: Observable<Song[]>;
  playlistName: string='';
  newPlaylist = {
    "name": this.playlistName,
    "description": "New playlist description",
    "public": false
  };
  visible=false
  Form = new FormGroup({
    playlistName: new FormControl(''),
    })


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
    public router:Router,
    ) {
  }

  ngOnInit() {
    this.playlists$ = this.getPlaylists();
    this.savedTracks$ = this.spotifyService.getSavedTracks()
  }
  showDialog(){
    this.visible=true
  }


  addPlaylist() {
    // @ts-ignore
    this.loginService.currentUser$.pipe(
      switchMap(user => this.playlistService.addPlaylist(user?.id, this.newPlaylist))
    ).subscribe(
       () => this.playlists$ = this.getPlaylists()
    );
    return this.router.navigate(['home/playlists']);
    this.visible=false
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
