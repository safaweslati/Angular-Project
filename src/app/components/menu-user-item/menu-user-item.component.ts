import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from "../../Models/User";
import {Artist} from "../../Models/Artist";

@Component({
  selector: 'app-menu-user-item',
  templateUrl: './menu-user-item.component.html',
  styleUrls: ['./menu-user-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuUserItemComponent implements OnInit{
     @Input() user!: User | Artist ;
    constructor(){}

  ngOnInit(): void {}


}
