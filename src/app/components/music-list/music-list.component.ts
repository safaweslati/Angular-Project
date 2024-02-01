import { Component, Input } from '@angular/core';
import {
  faClock,
  faDeleteLeft,
  faEllipsis,
  faPlay,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Song } from '../../Models/Song';
import { PlayerService } from '../../services/player.service';
import { PlaylistService } from '../../services/playlist.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import {SpotifyService} from "../../services/spotify.service";
import {Observable} from "rxjs";
import {Playlist} from "../../Models/Playlist";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css'],
})
export class MusicListComponent {
  @Input() songs: Song[] | null = [];
  // @ts-ignore
  @Input() playlist: Playlist;
  clockIcon = faClock;
  playIcon = faPlay;
  MoreIcon = faEllipsis;
  displayedSongs: any[] = [];
  showMore: boolean = false;
  selectedSong!: Song;
  isSaved!: boolean;
  isCurrentUserOwner$!: Observable<boolean>;

  // items: MenuItem[] = [
  //   // { label: 'Save', command: (event) => this.saveItem(event) },
  //   { label: 'Delete', command: (event) => this.deleteItem(event) },
  // ];

  constructor(
    public playerService: PlayerService,
    public playlistService: PlaylistService,
    private toast: ToastrService,
    private spotifyService: SpotifyService
  ) {
  }

  ngOnChanges(): void {
    this.displayedSongs = this.songs ? this.songs.slice(0, 5) : [];
    this.isCurrentUserOwner$ = this.playlistService.isCurrentUserOwner(this.playlist)
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedSongs = this.songs ? this.songs : []; // Show all songs
    } else {
      this.displayedSongs = this.showMore
        ? this.songs || []
        : this.songs
        ? this.songs.slice(0, 5)
        : []; // Show only the first 5 songs
    }
  }

  getArtists(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
  }

  deleteItem(song: Song) {
    this.selectedSong = song;
    const requestBody = {
      tracks: [
        {
          uri: this.selectedSong.uri,
        },
      ],
      snapshot_id: this.playlist.snapshot_id,
    };

    console.log(this.playlist);
    this.playlistService.DeleteItem(this.playlist.id, requestBody).subscribe(
      () => {
        console.log('asaabiii');
        this.toast.success('Deleted from the playlist');

        this.spotifyService.getPlaylistDetails(this.playlist.id).subscribe(
          (updatedDetails) => {
            this.playlistService.updatePlaylistDetails(updatedDetails);
          },
        );
      },
      (error) => {
        this.toast.error('Error deleting item from the playlist');
      }
    );

  }
/*
  checkSong() {
    this.playlistService.Check(this.selectedSong.id).subscribe(
      (reponse) => {
        this.isSaved = reponse[0];
      },
      (error) => {
        console.log('Error deleting item from the playlist', error);
      }
    );
  }
  saveItem(event: any) {
    this.checkSong();
    if (this.isSaved == true) {
      this.removeFromLikedSongs();
    } else {
      this.addToLikedSongs();
    }
  }

  addToLikedSongs() {
    const requestBody = {
      ids: [this.selectedSong.id],
    };

    this.playlistService.SaveTracks(requestBody).subscribe(
      () => {
        console.log('added to Liked Songs');
        this.toast.success('Added to Liked Songs');
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
  async updateMenuLabel() {
    try {
      const result = await this.checkSong();
      console.log('done' + result);

      if (this.isSaved === true) {
        this.items[0].label = 'Remove from Liked Songs';
      } else {
        this.items[0].label = 'Save to Liked Songs';
      }
    } catch (error) {
      console.error('Error checking song', error);
    }
  }

  removeFromLikedSongs() {
    this.playlistService.RemoveSavedTrack(this.selectedSong.id).subscribe(
      () => {
        this.toast.success('Removed From Liked Songs');
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
*/
  openMenu(song: Song) {
    this.selectedSong = song;
    //this.updateMenuLabel();
  }

  PlaySong(song: Song) {
      this.playerService.playMusic(song);

  }
}
