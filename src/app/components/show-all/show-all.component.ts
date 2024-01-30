import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { Playlist } from 'src/app/Models/Playlist';
import { Artist } from 'src/app/Models/Artist';
import { ActivatedRoute } from '@angular/router';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Album } from 'src/app/Models/album';
import { Episode } from 'src/app/Models/episode';
import { Show } from 'src/app/Models/show';
import { Audiobook } from 'src/app/Models/audiobook';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent {
  @Input() items$?: Observable<
    User[] | Playlist[] | Artist[] | Album[] | Episode[] | Show[] | Audiobook[]
  >;
  @Input() shouldApplyRoundedClass: boolean = false;
  itemType: String = '';
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistProfileService,
    public playerService: PlayerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemType = params['itemType'];
      this.id = params['id'];
      if (this.itemType === 'Artist') {
        this.items$ = this.artistService.getRelatedArtists(params['id']);
      } else if (this.itemType === 'Album') {
        this.items$ = this.artistService.getArtistAlbums(params['id']);
      } else if (this.itemType === 'Playlist') {
        this.items$ = this.playerService.playlists$;
      }
    });
  }
}
