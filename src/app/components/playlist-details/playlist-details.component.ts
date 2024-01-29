import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SpotifyService} from "../../services/spotify.service";
import {Playlist} from "../../Models/Playlist";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {
  details$!: Observable<Playlist>;
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.details$ = this.route.paramMap.pipe(switchMap(
      params => this.spotifyService.getPlaylistDetails(params.get('id'))
    ));
  }

}
