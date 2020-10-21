import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsOverlayComponent } from './applications-overlay.component';

describe('ApplicationsOverlayComponent', () => {
  let component: ApplicationsOverlayComponent;
  let fixture: ComponentFixture<ApplicationsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
