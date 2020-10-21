import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UsersComponent } from './dashboard/users/users.component';
import { AdsComponent } from './dashboard/ads/ads.component';
import { ApplicationsComponent } from './dashboard/applications/applications.component';
import { CompaniesComponent } from './dashboard/companies/companies.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { AdsOverlayComponent } from './dashboard/ads/ads-overlay/ads-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { UsersOverlayComponent } from './dashboard/users/users-overlay/users-overlay.component';
import { CompaniesOverlayComponent } from './dashboard/companies/companies-overlay/companies-overlay.component';
import { ApplicationsOverlayComponent } from './dashboard/applications/applications-overlay/applications-overlay.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AdsComponent,
    ApplicationsComponent,
    CompaniesComponent,
    AdsOverlayComponent,
    UsersOverlayComponent,
    CompaniesOverlayComponent,
    ApplicationsOverlayComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    AutoSizeInputModule,
    OverlayModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    PipesModule,
  ],
})
export class AdminModule {}
