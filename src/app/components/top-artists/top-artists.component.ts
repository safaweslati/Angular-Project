import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Artist } from '../../Models/Artist';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArtistsComponent {
  artists$: Observable<Artist[]> = of([]);

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.artists$ = this.spotifyService
      .getTopArtists()
      .pipe(tap((items) => console.log('artists : ', items)));
  }

}
