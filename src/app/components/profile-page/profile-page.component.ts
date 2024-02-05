import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],

})
export class ProfilePageComponent implements OnInit {
  profile$?: Observable<User>;
  artist$?: Observable<Artist[]>;
  userId: string | undefined;

  constructor(
    private spotifyService: SpotifyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;
    if (this.userId) {
      this.profile$ = this.spotifyService.getUserProfile(this.userId);
      this.artist$ = this.spotifyService.getFollowedArtists();
    }
  }
}
