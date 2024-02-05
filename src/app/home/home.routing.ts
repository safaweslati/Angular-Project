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
import { AlbumPageComponent } from '../components/album-page/album-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'savedTracks', component: SavedTracksComponent },
      { path: 'playlist/:id', component: PlaylistDetailsComponent },
      {
        path: 'search',
        component: SearchComponent,
      },
      { path: 'accueil/showMore', component: ShowAllComponent },
      { path: 'accueil', component: AccueilComponent },
      {
        path: 'showAll',
        component: ShowAllComponent,
      },
      { path: 'profile/:userId/showMore', component: ShowAllComponent },
      { path: 'profile/:userId', component: ProfilePageComponent },
      { path: 'artist/:id/showMore', component: ShowAllComponent },
      {
        path: 'artist/:id',
        component: ArtistProfileComponent,
      },
      { path: 'album/:id/:artistId/showMore', component: ShowAllComponent },
      { path: 'album/:id/:artistId', component: AlbumPageComponent },
      { path: 'search/:item/showMore', component: ShowAllComponent },
      {
        path: 'search/:item',
        component: SearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
