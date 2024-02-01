import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  faGuitar,
  faHome,
  faMusic,
  faPlus,
  faSearch,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Playlist } from '../../Models/Playlist';
import { SpotifyService } from '../../services/spotify.service';
import { LoginService } from '../../services/login.service';
import { Observable, switchMap } from 'rxjs';
import { Song } from '../../Models/Song';
import { Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelComponent implements OnInit, OnChanges {
  playlists$!: Observable<Playlist[]>;
  savedTracks$!: Observable<Song[]>;
  visible = false;
  Form = new FormGroup({
    playlistName: new FormControl(''),
  });
  playlistId: string = '';

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;
  signOutIcon = faSignOutAlt;
  addIcon = faPlus;

  constructor(
    public spotifyService: SpotifyService,
    public loginService: LoginService,
    public playlistService: PlaylistService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.playlists$ = this.getPlaylists();
    this.savedTracks$ = this.spotifyService.getSavedTracks();
  }
  showDialog() {
    this.visible = true;
  }
  addPlaylist(value: any) {
    if (value == null) {
      value = 'new Playlist';
    }
    let newPlaylist = {
      name: value,
      description: 'New playlist description',
      public: false,
    };
    this.loginService.currentUser$
      .pipe(
        switchMap((user) =>
          this.playlistService.addPlaylist(user?.id, newPlaylist)
        )
      )
      .subscribe((reponse) => {
        this.playlists$ = this.getPlaylists();
        this.visible = false;
        this.router.navigate([`home/playlist/${reponse.id}`]);
      });
  }
  cancel() {
    this.visible = false;
  }
  private getPlaylists() {
    return this.loginService.currentUser$.pipe(
      switchMap((user) => this.spotifyService.getUserPlaylists(user?.id))
    );
  }

  logout() {
    this.loginService.logout();
  }
}
