import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../Models/Playlist';
import {
  debounceTime,
  distinctUntilChanged,
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from '../../Models/Song';
import { PlayerService } from '../../services/player.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
})
export class PlaylistDetailsComponent implements OnInit {
  details$!: Observable<Playlist>;

  searchIcon = faSearch;
  searchControl = new FormControl();
  // @ts-ignore
  searchResults$: Observable<{ tracks: Song[] }>;
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
      this.refreshData();
    });

    this.details$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.spotifyService.getPlaylistDetails(params.get('id'))
      )
    );

    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        if (searchTerm.trim() === '') {
          return of({ tracks: [] });
        }
        return this.spotifyService.searchForSongs(searchTerm);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getArtists(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
  }
  PlaySong(song: Song) {
    this.playerService.playMusic(song);
  }
  AddItem(song: Song) {
    const requestBody = {
      uris: [song.uri],
      position: 0,
    };
    console.log(this.playlistId);
    this.playlistService.AddItem(requestBody, this.playlistId).subscribe(
      () => {
        console.log('asaabiii');
        this.toast.success('Added to the playlist');
      },
      (error) => {
        console.error('Error adding item to the playlist', error);
      }
    );
  }
  private refreshData() {
    // reset the input to null to avoid multiple api requests
    this.searchControl.setValue('');
  }
  protected readonly faSearch = faSearch;
  protected readonly faPlay = faPlay;
}
