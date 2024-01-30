import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from '../Models/Playlist';
import { User } from '../Models/User';
import { Artist } from '../Models/Artist';
import { Song } from '../Models/Song';
import { Album } from '../Models/album';
import { Audiobook } from '../Models/audiobook';
import { Episode } from '../Models/episode';
import { Show } from '../Models/show';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationSource = new Subject<
    User | Playlist | Artist | Album | Audiobook | Episode | Show
  >();
  navigation$ = this.navigationSource.asObservable();
  navigate(
    item: User | Playlist | Artist | Album | Audiobook | Episode | Show
  ) {
    this.navigationSource.next(item);
  }

  constructor() {}
}
