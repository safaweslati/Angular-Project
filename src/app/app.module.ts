import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationInterceptorProvider } from './interceptor/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { PlaylistHeaderComponent } from './components/playlist-header/playlist-header.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthentificationInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
