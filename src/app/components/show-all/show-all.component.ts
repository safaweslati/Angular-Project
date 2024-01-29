import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent {
  constructor(public playerService: PlayerService) {}
}
