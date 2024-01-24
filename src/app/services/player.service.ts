import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Song} from "../Models/Song";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private currentSong = new BehaviorSubject<Song | null>(null);
  public currentSong$ = this.currentSong.asObservable();

  constructor() { }

    playMusic(song: Song | null){
    this.currentSong.next(song);
  }
}

