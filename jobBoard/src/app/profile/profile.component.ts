import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
    password: new FormControl(''),
  });
  invalidUpdate = false;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserInfos();
  }

  getUserInfos(): void {
    this.user.getUser(this.auth.userInfos.id).subscribe((v) => {
      this.auth.userInfos = v;
      this.profileForm.get('firstName').setValue(v.f_name);
      this.profileForm.get('lastName').setValue(v.l_name);
      this.profileForm.get('email').setValue(v.email);
      this.profileForm.get('phone').setValue(v.phone);
    });
  }

  updateProfile(): void {
    const newValues = this.profileForm.value;
    this.invalidUpdate = false;
    this.user
      .updateUser({
        id: this.auth.userInfos.id,
        f_name: newValues.firstName,
        l_name: newValues.lastName,
        email: newValues.email,
        phone: newValues.phone,
        access: null,
        password: newValues.password,
      })
      .subscribe(
        (v) => {
          if (v) {
            this.getUserInfos();
            this.snackBar.open(
              'Successfully updated your profile!',
              'Dismiss',
              { duration: 2000 }
            );
          } else {
            this.invalidUpdate = true;
          }
        },
        (v) => (this.invalidUpdate = true)
      );
  }
}
