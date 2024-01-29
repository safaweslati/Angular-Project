import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { Album } from 'src/app/Models/Album';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListOfItemsComponent {
  @Input() items$?: Observable<User[] | Playlist[] | Artist[] | Album[]>;
  @Input() shouldApplyRoundedClass: boolean = false;
}
