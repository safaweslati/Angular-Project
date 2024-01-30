import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleLeft, faSearch, fas } from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { Song } from 'src/app/Models/Song';
import { Album } from 'src/app/Models/album';
import { Audiobook } from 'src/app/Models/audiobook';
import { Episode } from 'src/app/Models/episode';
import { Show } from 'src/app/Models/show';
import { APISearch } from 'src/app/Models/spotifySearch';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm: FormGroup;
  items$:
    | Observable<{
        artists: Artist[];
        tracks: Song[];
        playlists: Playlist[];
        episodes: Episode[];
        shows: Show[];
        audiobooks: Audiobook[];
        albums: Album[];
      }>
    | undefined;
  artists$: Observable<Artist[]> | undefined;
  albums$: Observable<Album[]> | undefined;
  episodes$: Observable<Episode[]> | undefined;
  shows$: Observable<Show[]> | undefined;
  playlists$: Observable<Playlist[]> | undefined;
  audiobooks$: Observable<Audiobook[]> | undefined;
  tracks$: Observable<Song[]> | undefined;
  constructor(private spotifyService: SpotifyService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.items$ = this.searchForm.get('search')?.valueChanges?.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.spotifyService
          .searchForItems(term)
          .pipe(catchError(() => of([])));
      })
    ) as Observable<{
      artists: Artist[];
      tracks: Song[];
      playlists: Playlist[];
      episodes: Episode[];
      shows: Show[];
      audiobooks: Audiobook[];
      albums: Album[];
    }>;
    this.artists$ = this.items$.pipe(
      map((data) => data.artists),
      shareReplay(1)
    );

    this.tracks$ = this.items$.pipe(
      map((data) => data.tracks),
      shareReplay(1)
    );

    this.playlists$ = this.items$.pipe(
      map((data) => data.playlists),
      shareReplay(1)
    );

    this.episodes$ = this.items$.pipe(
      map((data) => data.episodes),
      shareReplay(1)
    );

    this.shows$ = this.items$.pipe(
      map((data) => data.shows),
      shareReplay(1)
    );

    this.audiobooks$ = this.items$.pipe(
      map((data) => data.audiobooks),
      shareReplay(1)
    );

    this.albums$ = this.items$.pipe(
      map((data) => data.albums),
      shareReplay(1)
    );
  }
  angle = faAngleLeft;
  fas = fas;
  searchIcon = faSearch;
}
