import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { PlayerService } from 'src/app/services/player.service';
import { Audiobook } from 'src/app/Models/audiobook';
import { Show } from 'src/app/Models/show';
import { Album } from 'src/app/Models/album';
import { Episode } from 'src/app/Models/episode';
import { Song } from 'src/app/Models/Song';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListOfItemsComponent {
  showAll() {
    this.playerService.setShowAll(this.items);
    this.router.navigate(['/home/showAll']);
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

  constructor(private playerService: PlayerService, private router: Router) {}
}
