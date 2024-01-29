import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Song } from 'src/app/Models/Song';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  artist$!: Observable<Artist>;
  topTracks$!: Observable<Song[]>;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistProfileService
  ) {}

  ngOnInit(): void {
    this.artist$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.artistService.getArtistDetails(params.get('id'))
      )
    );
    this.topTracks$ = this.route.paramMap.pipe(
      switchMap((params) => this.artistService.getTopTracks(params.get('id')))
    );
  }
}
