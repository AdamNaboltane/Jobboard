import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { JobApplyComponent } from '../job-apply.component';
import { JobApplyService } from '../job-apply.service';

@Component({
  selector: 'app-job-apply-overlay',
  templateUrl: './job-apply-overlay.component.html',
  styleUrls: ['./job-apply-overlay.component.scss'],
})
export class JobApplyOverlayComponent implements OnInit {
  @Input() jobId: number = null;
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private job: JobService,
    private jobApply: JobApplyService
  ) {}

  ngOnInit(): void {
    this.jobApply.closeOverlay.subscribe((v) => {
      if (v && !!this.overlayRef) {
        this.overlayRef.detach();
      }
    });
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlayPositionBuilder
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      panelClass: 'notification-resume__panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      positionStrategy,
    });

    return overlayConfig;
  }

  showApplicationOverlay(): void {
    if (!this.jobId) {
      return;
    }
    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    // Create ComponentPortal that can be attached to a PortalHost
    const pickerPortal = new ComponentPortal(JobApplyComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(pickerPortal);

    this.job.getJobInfo(this.jobId).subscribe((v) => {
      this.jobApply.jobInfos = v;
    });

    this.overlayRef.backdropClick().subscribe((v) => {
      this.overlayRef.detach();
    });
  }
}
