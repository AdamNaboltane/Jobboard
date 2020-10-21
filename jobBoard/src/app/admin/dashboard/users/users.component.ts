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
import { UserService } from 'src/app/services/user.service';
import { UsersOverlayComponent } from './users-overlay/users-overlay.component';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'email',
    'password',
    'access',
    'f_name',
    'l_name',
    'phone',
    'edit',
  ];

  dataSource: MatTableDataSource<User>;

  idRowEdit = -1;

  userEdit: User;

  private overlayRef: OverlayRef;

  constructor(
    private user: UserService,
    private overlayService: OverlayService,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private snackBar: MatSnackBar
  ) {
    this.user.getAllUsers().subscribe();
  }

  ngOnInit(): void {
    this.user.getAllUsers().subscribe((v) => {
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

  editRow(row: User): void {
    this.idRowEdit = row.id;
    this.userEdit = row;
  }

  cancelEdit(): void {
    this.idRowEdit = -1;
  }

  saveEdit(): void {
    this.user.updateUser(this.userEdit).subscribe(
      (v) => {
        this.idRowEdit = -1;
        this.snackBar.open('Successfully updated user!', 'Dismiss', {
          duration: 2000,
        });
        this.user.getAllUsers().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while updating user. Please try again.',
          'Dismiss',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  deleteEdit(): void {
    this.user.deleteUser(this.userEdit.id).subscribe(
      (v) => {
        this.snackBar.open('Successfully deleted user!', 'Dismiss', {
          duration: 2000,
        });
        this.user.getAllUsers().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while deleting User. Please try again.',
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
    const pickerPortal = new ComponentPortal(UsersOverlayComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(pickerPortal);

    this.overlayRef.backdropClick().subscribe((v) => {
      this.overlayRef.detach();
    });
  }
}
