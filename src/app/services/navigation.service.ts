import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from '../Models/Playlist';
import { User } from '../Models/User';
import { Artist } from '../Models/Artist';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationSource = new Subject<User|Playlist|Artist>();
  navigation$ = this.navigationSource.asObservable();
  navigate(item: User|Playlist|Artist){
    this.navigationSource.next(item)
  }


  constructor() { }
}
