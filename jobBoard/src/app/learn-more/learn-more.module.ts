import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { LearnMoreComponent } from './learn-more.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LearnMoreRoutingModule } from './learn-more-routing.module';
import { JobApplyModule } from '../job-apply/job-apply.module';

@NgModule({
  declarations: [LearnMoreComponent],
  imports: [
    CommonModule,
    LearnMoreRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    JobApplyModule,
  ],
})
export class LearnMoreModule {}
