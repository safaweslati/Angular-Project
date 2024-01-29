import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {Observable, switchMap} from "rxjs";
import {LoginService} from "../../services/login.service";
import {Playlist} from "../../Models/Playlist";
import {faHome, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit{
  // @ts-ignore
  @Input() playlist:Playlist;
  searchIcon = faSearch;

  constructor(
    private playlistService :PlaylistService,
    private loginService: LoginService,
  ) {
  }
  ngOnInit() {

  }

    protected readonly faSearch = faSearch;
  protected readonly faHome = faHome;
}
