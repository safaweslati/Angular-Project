import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Song } from 'src/app/Models/Song';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @ViewChild('audioPlayer') audioPlayer: any;

  constructor(public playerService: PlayerService) {}

  updateAudioSource(song: Song) {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.src = song.previewUrl;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }
    return song.previewUrl;
  }
}
