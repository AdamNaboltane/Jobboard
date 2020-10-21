import { ApplicationsOverlayComponent } from './applications-overlay/applications-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OverlayService } from '../overlay.service';
import {
  Overlay,
  OverlayConfig,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'id_ad',
    'email',
    'f_name',
    'l_name',
    'phone',
    'edit',
  ];

  dataSource: MatTableDataSource<Application>;

  idRowEdit = -1;

  appEdit: Application;

  private overlayRef: OverlayRef;

  constructor(
    private app: ApplicationService,
    private overlayService: OverlayService,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private snackBar: MatSnackBar
  ) {
    this.app.getAllApplications().subscribe();
  }

  ngOnInit(): void {
    this.app.applicationList$.subscribe((v) => {
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

  editRow(row: Application): void {
    this.idRowEdit = row.id;
    this.appEdit = row;
  }

  cancelEdit(): void {
    this.idRowEdit = -1;
  }

  saveEdit(): void {
    this.app.updateApplication(this.appEdit).subscribe(
      (v) => {
        this.idRowEdit = -1;
        this.snackBar.open('Successfully updated application!', 'Dismiss', {
          duration: 2000,
        });
        this.app.getAllApplications().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while updating application. Please try again.',
          'Dismiss',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  deleteEdit(): void {
    this.app.deleteApplication(this.appEdit.id).subscribe(
      (v) => {
        this.snackBar.open('Successfully deleted application!', 'Dismiss', {
          duration: 2000,
        });
        this.app.getAllApplications().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while deleting application. Please try again.',
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
    const pickerPortal = new ComponentPortal(ApplicationsOverlayComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(pickerPortal);

    this.overlayRef.backdropClick().subscribe((v) => {
      this.overlayRef.detach();
    });
  }
}
