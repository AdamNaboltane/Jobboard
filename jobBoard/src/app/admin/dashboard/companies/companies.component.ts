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
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { CompaniesOverlayComponent } from './companies-overlay/companies-overlay.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'domain',
    'email',
    'name',
    'phone',
    'edit',
  ];

  dataSource: MatTableDataSource<Company>;

  idRowEdit = -1;

  companyEdit: Company;

  private overlayRef: OverlayRef;

  constructor(
    private company: CompanyService,
    private overlayService: OverlayService,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private snackBar: MatSnackBar
  ) {
    this.company.getAllCompanies().subscribe();
  }

  ngOnInit(): void {
    this.company.companyList$.subscribe((v) => {
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

  editRow(row: Company): void {
    this.idRowEdit = row.id;
    this.companyEdit = row;
  }

  cancelEdit(): void {
    this.idRowEdit = -1;
  }

  saveEdit(): void {
    this.company.updateCompany(this.companyEdit).subscribe(
      (v) => {
        this.idRowEdit = -1;
        this.snackBar.open('Successfully updated company!', 'Dismiss', {
          duration: 2000,
        });
        this.company.getAllCompanies().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while updating company. Please try again.',
          'Dismiss',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  deleteEdit(): void {
    this.company.deleteCompany(this.companyEdit.id).subscribe(
      (v) => {
        this.snackBar.open('Successfully deleted company!', 'Dismiss', {
          duration: 2000,
        });
        this.company.getAllCompanies().subscribe();
      },
      (err) => {
        this.snackBar.open(
          'Error while deleting company. Please try again.',
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
    const pickerPortal = new ComponentPortal(CompaniesOverlayComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(pickerPortal);

    this.overlayRef.backdropClick().subscribe((v) => {
      this.overlayRef.detach();
    });
  }
}
