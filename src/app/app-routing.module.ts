import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {loginGuard} from "./guards/login.guard";

const routes: Routes = [
  {path:'', redirectTo: 'player', pathMatch: "full"},
  {path: 'login' , loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)},
  {path: 'player' , loadChildren: () => import('./player/player.module').then((m) => m.PlayerModule),
  canMatch:[loginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
