import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Song } from 'src/app/Models/Song';
import { PlayerService } from 'src/app/services/player.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
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

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css'],
})
export class AddSongComponent implements OnInit {
  searchIcon = faSearch;
  // @ts-ignore
  searchResults$: Observable<{ tracks: Song[] }>;
  searchControl = new FormControl();
  @Input() playlistId!: string;
  constructor(
    public route: ActivatedRoute,
    public spotifyService: SpotifyService,
    public playerService: PlayerService,
    public playlistService: PlaylistService,
    public http: HttpClient,
    private toast: ToastrService
  ) {}
  ngOnInit() {
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
  ngOnChanges() {
    this.refreshData();
  }
  getArtists(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
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
  PlaySong(song: Song) {
    this.playerService.playMusic(song);
  }
  private refreshData() {
    this.searchControl.setValue('');
  }
}
