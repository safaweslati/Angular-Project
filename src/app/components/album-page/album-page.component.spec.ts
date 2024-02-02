import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPageComponent } from './album-page.component';

describe('AlbumPageComponent', () => {
  let component: AlbumPageComponent;
  let fixture: ComponentFixture<AlbumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumPageComponent]
    });
    fixture = TestBed.createComponent(AlbumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
