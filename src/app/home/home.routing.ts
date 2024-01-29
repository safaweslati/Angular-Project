import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {SavedTracksComponent} from "../components/saved-tracks/saved-tracks.component";
import {PlaylistDetailsComponent} from "../components/playlist-details/playlist-details.component";
import { ProfilePageComponent } from "../components/profile-page/profile-page.component";

const routes: Routes = [
  {path: '' , component: HomeComponent, children : [
      {path: 'savedTracks', component: SavedTracksComponent},
      {path: 'playlist/:id', component: PlaylistDetailsComponent},
      {path: 'profile/:userId', component : ProfilePageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
