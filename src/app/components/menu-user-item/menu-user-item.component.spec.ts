import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserItemComponent } from './menu-user-item.component';

describe('UserInfoComponent', () => {
  let component: MenuUserItemComponent;
  let fixture: ComponentFixture<MenuUserItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuUserItemComponent]
    });
    fixture = TestBed.createComponent(MenuUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
