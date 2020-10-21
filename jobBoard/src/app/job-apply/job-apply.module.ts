import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplyComponent } from './job-apply.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { JobApplyOverlayComponent } from './job-apply-overlay/job-apply-overlay.component';

@NgModule({
  declarations: [JobApplyComponent, JobApplyOverlayComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    FlexLayoutModule,
    OverlayModule,
  ],
  exports: [JobApplyOverlayComponent],
})
export class JobApplyModule {}
