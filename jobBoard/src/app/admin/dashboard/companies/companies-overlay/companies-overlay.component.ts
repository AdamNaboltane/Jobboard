import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { OverlayService } from '../../overlay.service';

@Component({
  selector: 'app-companies-overlay',
  templateUrl: './companies-overlay.component.html',
  styleUrls: ['./companies-overlay.component.scss'],
})
export class CompaniesOverlayComponent implements OnInit {
  overlayForm = new FormGroup({
    domain: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
  });

  constructor(
    private overlayService: OverlayService,
    private company: CompanyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  closeOverlay(): void {
    this.overlayService.closeOverlay.next(true);
  }

  submitForm(): void {
    this.company.postCompany(this.overlayForm.value).subscribe(
      (v) => {
        this.snackBar.open('Successfully created new company!', 'Dismiss', {
          duration: 2000,
        });
        this.company.getAllCompanies().subscribe();
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
