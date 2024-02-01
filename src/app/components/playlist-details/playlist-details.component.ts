import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../Models/Playlist';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  ObservedValueOf,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../services/player.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from 'src/app/Models/Song';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
})
export class PlaylistDetailsComponent implements OnInit {
  details$!: Observable<Playlist>;
  playlistId!: string;

  constructor(
    public route: ActivatedRoute,
    public spotifyService: SpotifyService,
    public playerService: PlayerService,
    public playlistService: PlaylistService,
    public http: HttpClient,
    private toast: ToastrService
  ) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.playlistId = data['id'];
    });

    this.details$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.spotifyService.getPlaylistDetails(params.get('id'))
      )
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly faSearch = faSearch;
  protected readonly faPlay = faPlay;
}
