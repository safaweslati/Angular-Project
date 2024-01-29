import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from '../Models/Playlist';
import { User } from '../Models/User';
import { Artist } from '../Models/Artist';
import { Album } from '../Models/Album';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationSource = new Subject<User | Playlist | Artist | Album>();
  navigation$ = this.navigationSource.asObservable();
  navigate(item: User | Playlist | Artist | Album) {
    this.navigationSource.next(item);
  }

  constructor() {}
}
