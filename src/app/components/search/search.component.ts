import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleLeft, faSearch, fas } from '@fortawesome/free-solid-svg-icons';
import {
  BehaviorSubject,
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
import { SpotifyService } from 'src/app/services/spotify.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

  private toggleSubject = new BehaviorSubject<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);
  toggleSubject$ = this.toggleSubject.asObservable();

  constructor(
    private spotifyService: SpotifyService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.items$ = this.searchForm.get('search')?.valueChanges?.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((term) => {
        this.location.replaceState(`/home/search/${term}`);
      }),
      switchMap((term: string) => {
        return this.spotifyService
          .searchForItems(term, [
            'artist',
            'track',
            'playlist',
            'episode',
            'show',
            'audiobook',
            'album',
          ])
          .pipe(
            catchError(() =>
              of({
                artists: [],
                tracks: [],
                playlists: [],
                episodes: [],
                shows: [],
                audiobooks: [],
                albums: [],
              })
            )
          );
      }),
      shareReplay()
    ) as Observable<{
      artists: Artist[];
      tracks: Song[];
      playlists: Playlist[];
      episodes: Episode[];
      shows: Show[];
      audiobooks: Audiobook[];
      albums: Album[];
    }>;

    this.artists$ = this.items$.pipe(map((data) => data.artists));

    this.tracks$ = this.items$.pipe(map((data) => data.tracks));

    this.playlists$ = this.items$.pipe(map((data) => data.playlists));

    this.episodes$ = this.items$.pipe(map((data) => data.episodes));

    this.shows$ = this.items$.pipe(map((data) => data.shows));

    this.audiobooks$ = this.items$.pipe(map((data) => data.audiobooks));

    this.albums$ = this.items$.pipe(map((data) => data.albums));
  }
  angle = faAngleLeft;
  fas = fas;
  searchIcon = faSearch;
  toggleSection(section: string): void {
    switch (section) {
      case 'showAll':
        this.toggleSubject.next([true, true, true, true, true, true]);
        break;
      case 'showArtists':
        this.toggleSubject.next([true, false, false, false, false]);
        break;
      case 'showAlbums':
        this.toggleSubject.next([false, true, false, false, false]);
        break;
      case 'showPlaylists':
        this.toggleSubject.next([false, false, true, false, false]);
        break;
      case 'showEpisodes':
        this.toggleSubject.next([false, false, false, true, false]);
        break;
      case 'showShows':
        this.toggleSubject.next([false, false, false, false, true]);
        break;
    }
  }
}
