import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuUserItemComponent } from '../components/menu-user-item/menu-user-item.component';
import { SavedTracksComponent } from '../components/saved-tracks/saved-tracks.component';
import { PlaylistHeaderComponent } from '../components/playlist-header/playlist-header.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';
import { MusicListComponent } from '../components/music-list/music-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../components/search/search.component';
import { TopArtistsComponent } from '../components/top-artists/top-artists.component';
import { PlayerCardComponent } from '../components/player-card/player-card.component';
import { PlaylistDetailsComponent } from '../components/playlist-details/playlist-details.component';
import { AccueilComponent } from '../components/accueil/accueil.component';
import { CardGroupComponent } from '../components/card-group/card-group.component';
import { ShowAllComponent } from '../components/show-all/show-all.component';
import { PlaylistGridComponent } from '../components/playlist-grid/playlist-grid.component';
import { SpotifyCardComponent } from '../components/spotify-card/spotify-card.component';
import { ListOfItemsComponent } from '../components/list-item/list-item.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ErrorImagePipe } from '../pipe/error-image.pipe';
import { UriPipe } from '../pipe/uri.pipe';
import { ArtistProfileComponent } from '../components/artist-profile/artist-profile.component';
import {WebPlaybackComponent} from "../components/web-playback/web-playback.component";
import {ItemDetailsComponent} from "../components/item-details/item-details.component";
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import { MenuModule } from 'primeng/menu';
import {BadgeModule} from "primeng/badge";
import {ToastModule} from "primeng/toast";
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
    SearchComponent,
    WebPlaybackComponent,
    AccueilComponent,
    CardGroupComponent,
    ShowAllComponent,
    PlaylistGridComponent,
    ArtistProfileComponent,
    SpotifyCardComponent,
    ListOfItemsComponent,
    ProfilePageComponent,
    ErrorImagePipe,
    UriPipe,
    ItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRouting,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    DialogModule,
    ButtonModule,
    MenuModule,
    BadgeModule,
    ToastModule,
  ],
})
export class HomeModule {}
