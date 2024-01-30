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

  private showAllSubject = new BehaviorSubject<boolean>(true);
  private showArtistsSubject = new BehaviorSubject<boolean>(true);
  private showAlbumsSubject = new BehaviorSubject<boolean>(true);
  private showPlaylistsSubject = new BehaviorSubject<boolean>(true);
  private showEpisodesSubject = new BehaviorSubject<boolean>(true);
  private showShowsSubject = new BehaviorSubject<boolean>(true);
  private showAudiobooksSubject = new BehaviorSubject<boolean>(true);

  showAll$ = this.showAllSubject.asObservable();
  showArtists$ = this.showArtistsSubject.asObservable();
  showAlbums$ = this.showAlbumsSubject.asObservable();
  showPlaylists$ = this.showPlaylistsSubject.asObservable();
  showEpisodes$ = this.showEpisodesSubject.asObservable();
  showShows$ = this.showShowsSubject.asObservable();
  showAudiobooks$ = this.showAudiobooksSubject.asObservable();

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
        return this.spotifyService.searchForItems(term).pipe(
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
        this.showArtistsSubject.next(true);
        this.showAlbumsSubject.next(true);
        this.showPlaylistsSubject.next(true);
        this.showEpisodesSubject.next(true);
        this.showShowsSubject.next(true);
        this.showAudiobooksSubject.next(true);
        break;
      case 'showArtists':
        this.showArtistsSubject.next(true);
        this.showAlbumsSubject.next(false);
        this.showPlaylistsSubject.next(false);
        this.showEpisodesSubject.next(false);
        this.showShowsSubject.next(false);
        this.showAudiobooksSubject.next(false);
        break;
      case 'showAlbums':
        this.showAlbumsSubject.next(true);
        this.showArtistsSubject.next(false);
        this.showPlaylistsSubject.next(false);
        this.showEpisodesSubject.next(false);
        this.showShowsSubject.next(false);
        this.showAudiobooksSubject.next(false);
        break;
      case 'showPlaylists':
        this.showPlaylistsSubject.next(true);
        this.showArtistsSubject.next(false);
        this.showAlbumsSubject.next(false);
        this.showEpisodesSubject.next(false);
        this.showShowsSubject.next(false);
        this.showAudiobooksSubject.next(false);
        break;
      case 'showEpisodes':
        this.showEpisodesSubject.next(true);
        this.showArtistsSubject.next(false);
        this.showAlbumsSubject.next(false);
        this.showPlaylistsSubject.next(false);
        this.showShowsSubject.next(false);
        this.showAudiobooksSubject.next(false);
        break;
      case 'showShows':
        this.showShowsSubject.next(true);
        this.showArtistsSubject.next(false);
        this.showAlbumsSubject.next(false);
        this.showPlaylistsSubject.next(false);
        this.showEpisodesSubject.next(false);
        this.showAudiobooksSubject.next(false);
        break;
      case 'showAudiobooks':
        this.showAudiobooksSubject.next(true);
        this.showArtistsSubject.next(false);
        this.showAlbumsSubject.next(false);
        this.showPlaylistsSubject.next(false);
        this.showEpisodesSubject.next(false);
        this.showShowsSubject.next(false);

        break;
    }
  }
}
