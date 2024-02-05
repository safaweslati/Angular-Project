import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { PlayerService } from 'src/app/services/player.service';
import { Audiobook } from 'src/app/Models/audiobook';
import { Show } from 'src/app/Models/show';
import { Album } from 'src/app/Models/album';
import { Episode } from 'src/app/Models/episode';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListOfItemsComponent {
  showAll() {
    this.playerService.setShowAll(this.items);
    const currentUrl = this.location.path();
    console.log(currentUrl);
    const newUrl = currentUrl + '/showMore';
    this.router.navigate([newUrl]);
  }
  @Input() items!:
    | User[]
    | Playlist[]
    | Artist[]
    | Audiobook[]
    | Show[]
    | Album[]
    | Episode[]
    | null;
  @Input() shouldApplyRoundedClass: boolean = false;
  @Input() title: string = '';

  constructor(
    private playerService: PlayerService,
    private location: Location,
    private router: Router
  ) {}
}
