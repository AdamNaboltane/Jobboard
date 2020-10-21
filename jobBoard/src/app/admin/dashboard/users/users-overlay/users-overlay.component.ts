import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../overlay.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-overlay',
  templateUrl: './users-overlay.component.html',
  styleUrls: ['./users-overlay.component.scss'],
})
export class UsersOverlayComponent implements OnInit {
  overlayForm = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
    password: new FormControl('', [Validators.required]),
  });

  invalidRegister = false;

  constructor(
    private overlayService: OverlayService,
    private user: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  closeOverlay(): void {
    this.overlayService.closeOverlay.next(true);
  }

  submitForm(): void {
    this.user.postUser(this.overlayForm.value).subscribe(
      (v) => {
        this.snackBar.open('Successfully created new user!', 'Dismiss', {
          duration: 2000,
        });
        this.user.getAllUsers().subscribe();
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
