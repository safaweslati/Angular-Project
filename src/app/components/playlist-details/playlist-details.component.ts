import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import {
  Observable,
  switchMap,
} from 'rxjs';
import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../services/player.service';
import { HttpClient } from '@angular/common/http';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],

})
export class PlaylistDetailsComponent implements OnInit {
  playlistId!: string;
  isCurrentUserOwner$!: Observable<boolean>;

  constructor(
    public route: ActivatedRoute,
    public spotifyService: SpotifyService,
    public playerService: PlayerService,
    public playlistService: PlaylistService,
    public http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.playlistId = data['id'];
    });

    this.route.params.pipe(
      switchMap((params) =>
        this.spotifyService.getPlaylistDetails(params['id'])
      )
    ).subscribe((details) => {
      this.playlistService.updatePlaylistDetails(details);
      this.isCurrentUserOwner$ = this.playlistService.isCurrentUserOwner(details)
    });
  }
  protected readonly faSearch = faSearch;
  protected readonly faPlay = faPlay;
}
