import {Component, Input, OnInit} from '@angular/core';
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../Models/User";
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
     signOutIcon= faSignOutAlt;
     @Input() user!: User ;
    constructor(private loginService: LoginService){}

  ngOnInit(): void {}

  logout() {
      this.loginService.logout();
  }
}
