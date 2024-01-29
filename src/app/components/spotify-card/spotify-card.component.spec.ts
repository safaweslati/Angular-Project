import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyCardComponent } from './spotify-card.component';

describe('SpotifyCardComponent', () => {
  let component: SpotifyCardComponent;
  let fixture: ComponentFixture<SpotifyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyCardComponent]
    });
    fixture = TestBed.createComponent(SpotifyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
