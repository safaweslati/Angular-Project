import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SavedTracksComponent } from '../components/saved-tracks/saved-tracks.component';
import { PlaylistDetailsComponent } from '../components/playlist-details/playlist-details.component';
import { SearchComponent } from '../components/search/search.component';
import { AccueilComponent } from '../components/accueil/accueil.component';
import { ShowAllComponent } from '../components/show-all/show-all.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ArtistProfileComponent } from '../components/artist-profile/artist-profile.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, children : [
      {path: 'savedTracks', component: SavedTracksComponent},
      {path: 'playlist/:id', component: PlaylistDetailsComponent}
    ]},
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'savedTracks', component: SavedTracksComponent },
      { path: 'playlist/:id', component: PlaylistDetailsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'accueil', component: AccueilComponent },
      {
        path: 'showAll',
        component: ShowAllComponent,
      },
      { path: 'profile/:userId', component: ProfilePageComponent },
      { path: 'artist/:id', component: ArtistProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
