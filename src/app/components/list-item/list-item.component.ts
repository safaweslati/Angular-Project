import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { Artist } from 'src/app/Models/Artist';
import { Playlist } from 'src/app/Models/Playlist';
import { User } from 'src/app/Models/User';
import { Audiobook } from 'src/app/Models/audiobook';
import { Show } from 'src/app/Models/show';
import { Album } from 'src/app/Models/album';
import { Episode } from 'src/app/Models/episode';
import { Song } from 'src/app/Models/Song';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListOfItemsComponent {
  @Input() items$?: Observable<
    User[] | Playlist[] | Artist[] | Audiobook[] | Show[] | Album[] | Episode[]
  >;
  @Input() shouldApplyRoundedClass: boolean = false;
  getItemRouterLink(item: any): string[] | null {
    if (item.type === 'artist') {
      return ['/home/artist', item.id];
    } else {
      return null;
    }
  }
}
