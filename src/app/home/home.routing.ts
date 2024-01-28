import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SavedTracksComponent } from '../components/saved-tracks/saved-tracks.component';
import { PlaylistDetailsComponent } from '../components/playlist-details/playlist-details.component';
import { ArtistProfileComponent } from '../components/artist-profile/artist-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'savedTracks', component: SavedTracksComponent },
      { path: 'playlist/:id', component: PlaylistDetailsComponent },
      { path: 'artist/:id', component: ArtistProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
