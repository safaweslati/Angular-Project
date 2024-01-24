import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTracksComponent } from './saved-tracks.component';

describe('HomeComponent', () => {
  let component: SavedTracksComponent;
  let fixture: ComponentFixture<SavedTracksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedTracksComponent]
    });
    fixture = TestBed.createComponent(SavedTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
