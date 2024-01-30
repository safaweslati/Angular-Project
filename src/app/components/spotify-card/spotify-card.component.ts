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
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-spotify-card',
  templateUrl: './spotify-card.component.html',
  styleUrls: ['./spotify-card.component.css'],
})
export class SpotifyCardComponent {
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

  constructor(
    public navigationService: NavigationService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  onCardClick() {
    this.navigationService.navigate(this.cardData);
  }
  public toggleHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
  isAlbumOrEpisode(
    cardData: User | Playlist | Artist | Show | Album | Audiobook | Episode
  ): cardData is Album | Episode {
    return (cardData as Album | Episode)?.release_date !== undefined;
  }
}
