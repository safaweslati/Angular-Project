import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Song} from "../Models/Song";
import {Playlist} from "../Models/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  private currentSong = new BehaviorSubject<Song | null>(null);
  public currentSong$ = this.currentSong.asObservable();
  private playlistsSource = new BehaviorSubject<Playlist[]>([]);
  playlists$ = this.playlistsSource.asObservable();

  setPlaylists(playlists: Playlist[]): void {
    this.playlistsSource.next(playlists);
  }

  playMusic(song: Song | null){
    this.currentSong.next(song);
  }
}

