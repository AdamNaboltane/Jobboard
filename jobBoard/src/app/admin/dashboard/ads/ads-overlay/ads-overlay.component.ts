import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../overlay.service';
import { JobService } from 'src/app/services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ads-overlay',
  templateUrl: './ads-overlay.component.html',
  styleUrls: ['./ads-overlay.component.scss'],
})
export class AdsOverlayComponent implements OnInit {
  overlayForm = new FormGroup({
    id_company: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    place: new FormControl('', []),
    wage: new FormControl('', []),
    work_time: new FormControl('', []),
  });
  constructor(
    private overlayService: OverlayService,
    private job: JobService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  closeOverlay(): void {
    this.overlayService.closeOverlay.next(true);
  }

  submitForm(): void {
    this.job.postJob(this.overlayForm.value).subscribe(
      (v) => {
        this.snackBar.open('Successfully created new ad!', 'Dismiss', {
          duration: 2000,
        });
        this.job.getAllJobs().subscribe();
        this.closeOverlay();
      },
      (err) => {
        this.snackBar.open('There was an error. Please try again.', 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }
}
