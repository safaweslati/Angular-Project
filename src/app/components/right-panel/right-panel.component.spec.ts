import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelComponent } from './right-panel.component';

describe('RightPanelComponent', () => {
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightPanelComponent]
    });
    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
