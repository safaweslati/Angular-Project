import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleLeft, faSearch, fas } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { APISearch } from 'src/app/Models/spotifySearch';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm: FormGroup;
  items$: Observable<APISearch[]> | undefined;
  constructor(private spotifyService: SpotifyService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.spotifyService
      .searchForItems('haifa')
      .subscribe((items) => console.log(items));
    // this.searchForm
    //   .get('search')
    //   ?.valueChanges.subscribe((items) => console.log(items));
    // this.searchForm.get('search')?.valueChanges.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap((item: string) => {
    //     if (item) {
    //       return this.spotifyService
    //         .searchForItems(item)
    //         .pipe(tap((items) => console.log(items)));
    //     } else {
    //       return of([]);
    //     }
    //   })
    // );
  }
  angle = faAngleLeft;
  fas = fas;
  searchIcon = faSearch;
}
