import {Component, OnInit} from '@angular/core';
import {faGuitar, faHome, faMusic, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Playlist} from "../../Models/Playlist";
import {SpotifyService} from "../../services/spotify.service";
import {User} from "../../Models/User";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit{
  playlists: Playlist[] = [];
  user!: User;

  homeIcon= faHome;
  searchIcon = faSearch;
  artistIcon= faGuitar;
  playlistIcon= faMusic;

  constructor(public spotifyService: SpotifyService, public loginService: LoginService) {
  }

   ngOnInit() {
    this.getPlaylists()
    };
    async getPlaylists(){
      this.playlists = await this.spotifyService.getUserPlaylists();
    }

}
