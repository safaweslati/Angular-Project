import { ResolveFn} from '@angular/router';
import {Song} from "../Models/Song";
import {SpotifyService} from "../services/spotify.service";
import {inject} from "@angular/core";
import {catchError, of, tap} from "rxjs";

export const savedTracksResolver: ResolveFn<Song[] | null>= (route, state) => {
  const spotifyService = inject(SpotifyService)
  //console.log('resolver '+spotifyService.getSavedTracks())
  return spotifyService.getSavedTracks().pipe(
    tap((data) => {
      console.log('Resolver Data:', data);
    }),
    catchError(() => {
      return of(null);
    })
  );
};
