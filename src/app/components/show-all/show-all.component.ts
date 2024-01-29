import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { Playlist } from 'src/app/Models/Playlist';
import { Artist } from 'src/app/Models/Artist';
import { Album } from 'src/app/Models/Album';
import { ActivatedRoute } from '@angular/router';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent {
  //constructor(public playerService: PlayerService) {}
  @Input() items$?: Observable<User[] | Playlist[] | Artist[] | Album[]>;
  @Input() shouldApplyRoundedClass: boolean = false;
  itemType: String = '';

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemType = params['itemType'];
      if (this.itemType === 'Artist') {
        this.items$ = this.artistService.getRelatedArtists(params['id']);
      } else if (this.itemType === 'Album') {
        this.items$ = this.artistService.getArtistAlbums(params['id']);
      }
    });
  }
}
