import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from 'src/app/services/application.service';
import { OverlayService } from '../../overlay.service';

@Component({
  selector: 'app-applications-overlay',
  templateUrl: './applications-overlay.component.html',
  styleUrls: ['./applications-overlay.component.scss'],
})
export class ApplicationsOverlayComponent implements OnInit {
  overlayForm = new FormGroup({
    id_ad: new FormControl('', [Validators.required]),
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
  });

  constructor(
    private overlayService: OverlayService,
    private app: ApplicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  closeOverlay(): void {
    this.overlayService.closeOverlay.next(true);
  }

  submitForm(): void {
    this.app.postApplication(this.overlayForm.value).subscribe(
      (v) => {
        this.snackBar.open('Successfully created new application!', 'Dismiss', {
          duration: 2000,
        });
        this.app.getAllApplications().subscribe();
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
