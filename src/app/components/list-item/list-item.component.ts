import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/Models/Album';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { PlayerService } from 'src/app/services/player.service';

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
  @Input() items!: User[] | Playlist[] | Artist[] | Album[] | null;
  @Input() shouldApplyRoundedClass: boolean = false;
  @Input() title: string = '';

  constructor(private playerService: PlayerService, private router: Router) {}
}
