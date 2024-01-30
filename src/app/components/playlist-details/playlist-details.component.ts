import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../Models/Playlist';
import {debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';
import {faPlay, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {APISearch} from "../../Models/spotifySearch";
import {Song} from "../../Models/Song";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
})
export class PlaylistDetailsComponent implements OnInit {
  details$!: Observable<Playlist>;
  searchIcon = faSearch;
  searchControl = new FormControl();
  searchResults :APISearch[]=[]
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService:PlayerService
  ) {}

  ngOnInit() {
    this.details$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.spotifyService.getPlaylistDetails(params.get('id'))
      )
    );
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.spotifyService.searchForItems(searchTerm))
      )
      .subscribe((results) => {
        this.searchResults = results;
        console.log(this.searchResults)
      });

  }
  PlaySong(song: Song) {
    this.playerService.playMusic(song);
  }
    protected readonly faSearch = faSearch;
  protected readonly faPlay = faPlay;
}
