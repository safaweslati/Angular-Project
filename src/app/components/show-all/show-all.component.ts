import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/Models/User';
import { Playlist } from 'src/app/Models/Playlist';
import { Artist } from 'src/app/Models/Artist';
import { Album } from 'src/app/Models/Album';
import { ActivatedRoute } from '@angular/router';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent {
  @Input() items$!: Observable<User[] | Playlist[] | Artist[] | Album[] | null>;
  @Input() shouldApplyRoundedClass: boolean = false;
  itemType: String = '';
  id: string = '';
  idUser$!: Observable<String | undefined>;
  userData$ = this.loginService.currentUser$;
  constructor(
    public playerService: PlayerService,
    private loginService: LoginService
  ) {}

  isArtist(item: any): boolean {
    return 'followers' in item;
  }
}
