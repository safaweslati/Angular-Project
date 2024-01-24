import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHeaderComponent } from './playlist-header.component';

describe('TopArtistComponent', () => {
  let component: PlaylistHeaderComponent;
  let fixture: ComponentFixture<PlaylistHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistHeaderComponent]
    });
    fixture = TestBed.createComponent(PlaylistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
