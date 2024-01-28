import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ArtistProfileService } from 'src/app/services/artist-profile.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  artistId: string = '';
  artist: any;
  topTracks: any[] = [];
  displayedTopTracks: any[] = [];
  showMore: boolean = false;
  moreInfo: string = '';

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artistId = params['id'];
      this.fetchArtistDetails();
      this.fetchTopTracks();

      /*
      this.artistService.getArtistInfo(this.artist.href).subscribe(
        (response) => {
          console.log('Réponse de la fonction dans le service:', response);
          // Traitez les données ici
        },
        (error) => {
          console.error('Erreur lors de la fonction dans le service:', error);
          // Traitez les erreurs ici
        }
      );*/
    });
  }

  fetchArtistDetails(): void {
    this.artistService.getArtistDetails(this.artistId).subscribe((data) => {
      this.artist = data;
    });
  }

  fetchTopTracks(): void {
    this.artistService.getTopTracks(this.artistId).subscribe(
      (data) => {
        this.topTracks = data;
        this.displayedTopTracks = this.topTracks.slice(0, 5);
      },
      (error) => {
        // Gérez les erreurs ici selon vos besoins
        console.error('Error fetching top tracks:', error);
      }
    );
  }
  toggleShowMore(): void {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedTopTracks = this.topTracks; // Show all tracks
    } else {
      this.displayedTopTracks = this.topTracks.slice(0, 5); // Show only the first 5 tracks
    }
  }
}
