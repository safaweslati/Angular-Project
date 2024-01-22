import {Component, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {Song} from "../../Models/Song";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  @ViewChild('audioPlayer') audioPlayer: any;

  constructor(public playerService: PlayerService) {
  }

  updateAudioSource(song: Song) {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.src = song.previewUrl;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }
    return song.previewUrl

  }
}
