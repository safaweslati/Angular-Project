import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import {PlayerRouting} from "./player.routing";
import {LeftPanelComponent} from "../components/left-panel/left-panel.component";
import {MenuElementComponent} from "../components/menu-element/menu-element.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UserInfoComponent} from "../components/user-info/user-info.component";
import {HomeComponent} from "../components/home/home.component";
import {TopArtistComponent} from "../components/top-artist/top-artist.component";
import {RightPanelComponent} from "../components/right-panel/right-panel.component";
import {MusicListComponent} from "../components/music-list/music-list.component";
import {FormsModule} from "@angular/forms";
import {TopArtistsComponent} from "../components/top-artists/top-artists.component";
import {ArtistItemComponent} from "../components/artist-item/artist-item.component";
import {PlayerCardComponent} from "../components/player-card/player-card.component";



@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuElementComponent,
    UserInfoComponent,
    HomeComponent,
    TopArtistComponent,
    RightPanelComponent,
    MusicListComponent,
    TopArtistsComponent,
    ArtistItemComponent,
    PlayerCardComponent,

  ],
  imports: [
    CommonModule,
    PlayerRouting,
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
