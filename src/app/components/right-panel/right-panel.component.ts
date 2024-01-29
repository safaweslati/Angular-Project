import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Song} from "../../Models/Song";

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPanelComponent {
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
