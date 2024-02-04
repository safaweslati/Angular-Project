import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";
import {map, Observable, tap} from "rxjs";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) : Observable<boolean> => {
  const loginService = inject(LoginService);
  const router = inject(Router)

  return loginService.isLogged$.pipe(
    map((isLogged) => {
      if (isLogged) {
        router.navigate(['home/accueil']);
        return false;
      }
      return true;
    }))
}
