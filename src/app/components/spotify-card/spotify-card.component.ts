import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/Models/Album';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { NavigationService } from 'src/app/services/navigation.service';

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
  }
  @Input() cardData!: Album | User | Playlist | Artist;
  @Input() shouldApplyRoundedClass: boolean = false;
  isHovered: boolean = false;

  constructor(
    public navigationService: NavigationService,
    private router: Router
  ) {}

  onCardClick() {
    this.navigationService.navigate(this.cardData);
  }
  public toggleHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
  isAlbum(cardData: Album | User | Playlist | Artist): cardData is Album {
    return (cardData as Album)?.releaseDate !== undefined;
  }
}
