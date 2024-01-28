import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRouting} from "./home.routing";
import {LeftPanelComponent} from "../components/left-panel/left-panel.component";
import {MenuItemComponent} from "../components/menu-item/menu-item.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenuUserItemComponent} from "../components/menu-user-item/menu-user-item.component";
import {SavedTracksComponent} from "../components/saved-tracks/saved-tracks.component";
import {PlaylistHeaderComponent} from "../components/playlist-header/playlist-header.component";
import {RightPanelComponent} from "../components/right-panel/right-panel.component";
import {MusicListComponent} from "../components/music-list/music-list.component";
import {FormsModule} from "@angular/forms";
import {TopArtistsComponent} from "../components/top-artists/top-artists.component";
import {PlayerCardComponent} from "../components/player-card/player-card.component";
import {PlaylistDetailsComponent} from "../components/playlist-details/playlist-details.component";
import {AccueilComponent} from "../components/accueil/accueil.component";
import {CardGroupComponent} from "../components/card-group/card-group.component";
import {ShowAllComponent} from "../components/show-all/show-all.component";
import {PlaylistGridComponent} from "../components/playlist-grid/playlist-grid.component";



@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    MenuItemComponent,
    MenuUserItemComponent,
    SavedTracksComponent,
    PlaylistHeaderComponent,
    RightPanelComponent,
    MusicListComponent,
    TopArtistsComponent,
    PlayerCardComponent,
    PlaylistDetailsComponent,
    AccueilComponent,
    CardGroupComponent,
    ShowAllComponent,
    PlaylistGridComponent,

  ],
  imports: [
    CommonModule,
    HomeRouting,
    FontAwesomeModule,
    FormsModule
  ],
})
export class HomeModule { }
