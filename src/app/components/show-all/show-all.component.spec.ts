import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllComponent } from './show-all.component';

describe('ShowAllComponent', () => {
  let component: ShowAllComponent;
  let fixture: ComponentFixture<ShowAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllComponent]
    });
    fixture = TestBed.createComponent(ShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
