import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LogoutRoutingModule, MatSnackBarModule],
})
export class LogoutModule {}
