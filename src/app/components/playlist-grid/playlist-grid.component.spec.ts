import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistGridComponent]
    });
    fixture = TestBed.createComponent(PlaylistGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
