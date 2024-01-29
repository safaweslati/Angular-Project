import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlayerService} from "../services/player.service";
import {map, tap} from "rxjs";

export const showAllGuard: CanActivateFn = (route, state) => {
  const playerService = inject(PlayerService)
  const router = inject(Router)
  return playerService.playlists$.pipe(
    map((playlists) => playlists && playlists.length > 0),
    tap((canActivate) => {
      if (!canActivate) {
        router.navigate(['/home/accueil']);
      }
    }),
    );
};
