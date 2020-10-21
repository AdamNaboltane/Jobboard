import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesOverlayComponent } from './companies-overlay.component';

describe('CompaniesOverlayComponent', () => {
  let component: CompaniesOverlayComponent;
  let fixture: ComponentFixture<CompaniesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
