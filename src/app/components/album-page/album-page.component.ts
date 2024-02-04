import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize, switchMap, tap } from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Song } from 'src/app/Models/Song';
import { Album } from 'src/app/Models/album';

import { ArtistProfileService } from 'src/app/services/artist-profile.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],

})
export class AlbumPageComponent implements OnInit{
  album$!: Observable<Album>;
  albumTracks$!: Observable<Song[]>;

  artistId: string = '';
  moreAlbumsFromTheSameArtists$!: Observable<Album[]>;


  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private artistService: ArtistProfileService,
  ) {}

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.spotifyService.getAlbumtDetails(params.get('id'))
      ),
    );


    this.albumTracks$ = this.route.paramMap.pipe(
      switchMap((params) => this.spotifyService.getAlbumTracks(params.get('id'))),
    );
    this.moreAlbumsFromTheSameArtists$ = this.route.paramMap.pipe(
      switchMap((params) => this.artistService.getArtistAlbums(params.get('artistId'))),
    );

  }

}
