import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './job-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobApplyModule } from '../job-apply/job-apply.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    JobListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    JobApplyModule,
    PipesModule,
  ],
})
export class JobListModule {}
