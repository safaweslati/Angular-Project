import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PlayerComponent} from "./player.component";
import {HomeComponent} from "../components/home/home.component";

const routes: Routes = [
  {path: '' , component: PlayerComponent, children : [
      {path: 'home', component: HomeComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRouting {}
