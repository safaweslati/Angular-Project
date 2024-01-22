import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-element',
  templateUrl: './menu-element.component.html',
  styleUrls: ['./menu-element.component.css']
})
export class MenuElementComponent {
  constructor(private router: Router) {
  }
  @Input() contenu="";

}
