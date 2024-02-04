import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
import {SpotifyService} from "../../services/spotify.service";
import {Observable} from "rxjs";
import {Playlist} from "../../Models/Playlist";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css'],
})
export class MusicListComponent implements OnInit,OnChanges{
  @Input() songs: Song[] | null = [];
  // @ts-ignore
  @Input() playlist: Playlist;
  clockIcon = faClock;
  playIcon = faPlay;
  displayedSongs: any[] = [];
  showMore: boolean = false;
  selectedSong!: Song;
  isCurrentUserOwner$!: Observable<boolean>;


  constructor(
    public playerService: PlayerService,
    public playlistService: PlaylistService,
    private toast: ToastrService,
    private spotifyService: SpotifyService,
  ) {}
  ngOnInit() {

  }
  ngOnChanges(): void {
    this.displayedSongs = this.songs ? this.songs.slice(0, 5) : [];
    this.isCurrentUserOwner$ = this.playlistService.isCurrentUserOwner(this.playlist);
    this.checkSongs(this.songs)
  }

  checkSongs(songs: Song[] | null) {
    const MaxIds = 50;

    if (songs && songs.length > 0) {
      for (let i = 0; i < songs.length; i += MaxIds) {
        const chunk = songs.slice(i, i + MaxIds);
        const ids = chunk.map(song => song.id).join(',');

        this.playlistService.Check(ids).subscribe((response) => {
          for (let j = 0; j < response.length; j++) {
            const index = i + j;
            if (index < songs.length) {
              songs[index].isLiked = response[j];
            }
          }
        });
      }
    }
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

  // @ts-ignore

  addToLikedSongs(song:Song) {
    const requestBody = {
      ids: [song.id],
    };
    this.playlistService.SaveTracks(requestBody).subscribe(
      () => {
        song.isLiked=true
        console.log('added to Liked Songs');
        this.toast.success('Added to Liked Songs');
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  removeFromLikedSongs(song:Song) {
    this.playlistService.RemoveSavedTrack(song.id).subscribe(
      () => {
        song.isLiked=false
        this.toast.success('Removed From Liked Songs');
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  PlaySong(song: Song) {
      this.playerService.playMusic(song);
  }
}
