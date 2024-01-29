import { Component, ElementRef, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-spotify-card',
  templateUrl: './spotify-card.component.html',
  styleUrls: ['./spotify-card.component.css']
})
export class SpotifyCardComponent {
  @Input() cardData!: User | Playlist | Artist;
  @Input() shouldApplyRoundedClass: boolean = false;
  isHovered: boolean = false;


  constructor(public navigationService: NavigationService ,private renderer: Renderer2, private el: ElementRef) {}

  onCardClick(){
    this.navigationService.navigate(this.cardData);
  }
  public toggleHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
}
