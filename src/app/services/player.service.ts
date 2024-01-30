import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../Models/Song';
import { Playlist } from '../Models/Playlist';
import { Artist } from '../Models/Artist';
import { Album } from '../Models/album';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  private currentSong = new BehaviorSubject<Song | null>(null);
  public currentSong$ = this.currentSong.asObservable();
  private showAllSource = new BehaviorSubject<
    Playlist[] | Artist[] | Album[] | User[] | null
  >([]);
  showAll$ = this.showAllSource.asObservable();

  setShowAll(showAll: Playlist[] | Artist[] | Album[] | User[] | null): void {
    this.showAllSource.next(showAll);
  }

  playMusic(song: Song | null) {
    this.currentSong.next(song);
  }
}
