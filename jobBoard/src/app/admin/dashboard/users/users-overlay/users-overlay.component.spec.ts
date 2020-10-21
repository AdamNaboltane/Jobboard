import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOverlayComponent } from './users-overlay.component';

describe('UsersOverlayComponent', () => {
  let component: UsersOverlayComponent;
  let fixture: ComponentFixture<UsersOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
