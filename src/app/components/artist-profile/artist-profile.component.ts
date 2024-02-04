import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Song } from 'src/app/Models/Song';
import { Album } from 'src/app/Models/album';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],

})
export class ArtistProfileComponent implements OnInit {
  artist$!: Observable<Artist>;
  topTracks$!: Observable<Song[]>;
  artistId: string = '';
  relatedArtists$!: Observable<Artist[]>;
  albums$!: Observable<Album[]>;

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
    this.relatedArtists$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.artistService.getRelatedArtists(params.get('id'))
      )
    );
    this.albums$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.artistService.getArtistAlbums(params.get('id'))
      )
    );
  }
}
