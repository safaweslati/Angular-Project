import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent{

  @Input() imageUrl: string = "";
  @Input() title: string = "";

}
