import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  constructor(private router: Router) {
  }
  @Input() contenu="";
  @Input() routerLink: string | any[] = [];

}
