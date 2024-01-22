import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuElementComponent } from './menu-element.component';

describe('MenuElementComponent', () => {
  let component: MenuElementComponent;
  let fixture: ComponentFixture<MenuElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuElementComponent]
    });
    fixture = TestBed.createComponent(MenuElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
