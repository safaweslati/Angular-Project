import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css'],
})
export class CardGroupComponent {
  @Input() title: string = '';
  @Input() input: any;
  @Input() inputAll: any;
  constructor(private playerService: PlayerService, private router: Router) {}

  ShowAll() {
    console.log(this.inputAll);
    this.playerService.setPlaylists(this.inputAll);
    this.router.navigate(['/home/showAll', 0, 'Playlist']);
  }
}
