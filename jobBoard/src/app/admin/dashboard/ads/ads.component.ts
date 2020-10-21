import { ComponentPortal } from '@angular/cdk/portal';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { MatSort } from '@angular/material/sort';
import { OverlayService } from '../overlay.service';
import {
  Overlay,
  OverlayConfig,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { AdsOverlayComponent } from './ads-overlay/ads-overlay.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'id_company',
    'title',
    'desc',
    'place',
    'wage',
    'work_time',
    'edit',
  ];
  dataSource: MatTableDataSource<Job>;

  idRowEdit = -1;

  jobEdit: Job;

  private overlayRef: OverlayRef;

  constructor(
    private job: JobService,
    private overlayService: OverlayService,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private snackBar: MatSnackBar
  ) {
    this.job.getAllJobs().subscribe();
  }

  ngOnInit(): void {
    this.job.jobList$.subscribe((v) => {
      this.dataSource = new MatTableDataSource(v);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.overlayService.closeOverlay.subscribe((v) => {
      if (v && !!this.overlayRef) {
        this.overlayRef.detach();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(row: Job): void {
    this.idRowEdit = row.id;
    this.jobEdit = row;
  }

  cancelEdit(): void {
    this.idRowEdit = -1;
  }

  saveEdit(): void {
    this.job.updateJob(this.jobEdit).subscribe(
      (v) => {
        this.idRowEdit = -1;
        this.snackBar.open('Successfully updated ad!', 'Dismiss', {
          duration: 2000,
        });
        this.job.getAllJobs().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while updating ad. Please try again.',
          'Dismiss',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  deleteEdit(): void {
    this.job.deleteJob(this.jobEdit.id).subscribe(
      (v) => {
        this.snackBar.open('Successfully deleted ad!', 'Dismiss', {
          duration: 2000,
        });
        this.job.getAllJobs().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while deleting ad. Please try again.',
          'Dismiss',
          { duration: 2000 }
        );
      }
    );
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

  showOverlay(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    // Create ComponentPortal that can be attached to a PortalHost
    const pickerPortal = new ComponentPortal(AdsOverlayComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(pickerPortal);

    this.overlayRef.backdropClick().subscribe((v) => {
      this.overlayRef.detach();
    });
  }
}
