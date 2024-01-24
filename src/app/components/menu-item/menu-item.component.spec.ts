import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';

describe('MenuElementComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemComponent]
    });
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
