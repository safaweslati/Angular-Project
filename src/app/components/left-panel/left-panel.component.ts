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
import {Observable, switchMap, tap} from 'rxjs';
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
  savedTracks$!: Observable<Song[]>;
  visible = false;
  Form = new FormGroup({
    playlistName: new FormControl(''),
  });

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
     this.getPlaylists().subscribe(
      (response)=>{
        this.playlistService.updatePlaylists(response)
      }
    )
    this.savedTracks$ = this.spotifyService.getSavedTracks();
  }
  showDialog() {
    this.visible = true;
  }
  addPlaylist(value: any) {
    if (value == null) {
      value = 'new Playlist';
    }

    const newPlaylist = {
      name: value,
      description: 'New playlist description',
      public: false,
    };

    this.loginService.currentUser$
      .pipe(
        switchMap((user) =>
          this.playlistService.addPlaylist(user?.id, newPlaylist).pipe(
            switchMap((response) =>
              this.spotifyService.getUserPlaylists(user?.id).pipe(
                tap((playlists) =>{

                  this.visible = false;
                  this.router.navigate([`home/playlist/${response.id}`]);
                  this.playlistService.updatePlaylists(playlists);
                }
              )
            )
          )
        )
      )).subscribe()
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
