import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { Album } from 'src/app/Models/album';
import { Audiobook } from 'src/app/Models/audiobook';
import { Episode } from 'src/app/Models/episode';
import { Show } from 'src/app/Models/show';

@Component({
  selector: 'app-spotify-card',
  templateUrl: './spotify-card.component.html',
  styleUrls: ['./spotify-card.component.css'],
})
export class SpotifyCardComponent {
  navigate() {
    if ('followers' in this.cardData) {
      this.router.navigate(['/home/artist', this.cardData.id]);
    }
    if ('songs' in this.cardData) {
      this.router.navigate(['/home/playlist', this.cardData.id]);
    }
    if ('total_tracks' in this.cardData) {
      this.router.navigate([
        '/home/album',
        this.cardData.id,
        this.cardData.artists[0].id,
      ]);
    }
  }
  @Input() cardData!:
    | User
    | Playlist
    | Artist
    | Show
    | Album
    | Audiobook
    | Episode;
  @Input() shouldApplyRoundedClass: boolean = false;
  isHovered: boolean = false;

  constructor(private router: Router) {}

  public toggleHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
  isAlbum(cardData: Album | User | Playlist | Artist): cardData is Album {
    return (cardData as Album)?.release_date !== undefined;
  }
  isAlbumOrEpisode(
    cardData: User | Playlist | Artist | Show | Album | Audiobook | Episode
  ): cardData is Album | Episode {
    return (cardData as Album | Episode)?.release_date !== undefined;
  }
}
