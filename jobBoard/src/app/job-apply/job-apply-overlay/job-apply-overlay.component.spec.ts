import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyOverlayComponent } from './job-apply-overlay.component';

describe('JobApplyOverlayComponent', () => {
  let component: JobApplyOverlayComponent;
  let fixture: ComponentFixture<JobApplyOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplyOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplyOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
