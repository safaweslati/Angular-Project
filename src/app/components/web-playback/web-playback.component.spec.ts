import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPlaybackComponent } from './web-playback.component';

describe('WebPlaybackComponent', () => {
  let component: WebPlaybackComponent;
  let fixture: ComponentFixture<WebPlaybackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebPlaybackComponent]
    });
    fixture = TestBed.createComponent(WebPlaybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
