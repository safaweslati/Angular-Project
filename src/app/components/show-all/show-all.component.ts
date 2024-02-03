import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/Models/User';
import { Playlist } from 'src/app/Models/Playlist';
import { Artist } from 'src/app/Models/Artist';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../../Models/album';
import { faAngleLeft, fas } from '@fortawesome/free-solid-svg-icons';

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
  angle = faAngleLeft;
  fas = fas;
  constructor(
    public playerService: PlayerService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  previous() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  isArtist(item: any): boolean {
    return 'followers' in item;
  }
}
