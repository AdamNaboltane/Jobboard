import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsOverlayComponent } from './ads-overlay.component';

describe('AdsOverlayComponent', () => {
  let component: AdsOverlayComponent;
  let fixture: ComponentFixture<AdsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
