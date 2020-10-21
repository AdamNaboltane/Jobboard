import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Job } from '../models/job';
import { JobApplyService } from './job-apply.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from '../services/application.service';
import { Application } from '../models/application';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss'],
})
export class JobApplyComponent implements OnInit, OnDestroy {
  jobInfos: Job = null;

  subscriptions: Subscription[] = [];

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
    id_ad: new FormControl('', []),
  });

  applyError = false;

  constructor(
    private jobApply: JobApplyService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private app: ApplicationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.jobApply.jobInfos$.subscribe((v) => {
        this.jobInfos = v;
        this.checkIfAuthentified();
      })
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  checkIfAuthentified(): void {
    if (this.auth.isAuthenticated) {
      const userInfos = this.auth.userInfos;
      const app = new Application();
      app.email = userInfos.email;
      app.f_name = userInfos.f_name;
      app.l_name = userInfos.l_name;
      app.phone = userInfos.phone;
      app.id_ad = this.jobInfos.id;

      this.app.postApplication(app).subscribe(
        (v) => {
          this.snackBar.open('Successfully applied!', 'Dismiss', {
            duration: 2000,
          });
          this.closeOverlay();
        },
        (err) => {
          this.snackBar.open(
            'You already applied to this job.',
            'Dismiss',
            {
              duration: 2000,
            }
          );
          this.closeOverlay();
        }
      );
    }
  }

  closeOverlay(): void {
    this.jobApply.closeOverlay.next(true);
  }

  submitForm(): void {
    this.applyError = false;
    this.app.postApplication(this.applyForm.value).subscribe(
      (v) => {
        this.snackBar.open('Successfully applied!', 'Dismiss', {
          duration: 2000,
        });
        this.closeOverlay();
      },
      (err) => (this.applyError = true)
    );
  }
}
