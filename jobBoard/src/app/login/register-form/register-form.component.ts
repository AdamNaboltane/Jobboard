import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9\\s]{10}')]),
    password: new FormControl('', [Validators.required]),
  });
  invalidRegister = false;

  @Output() changeTab: EventEmitter<any> = new EventEmitter<any>();

  constructor(private auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  registerUser(): void {
    const newUser = this.registerForm.value;
    this.invalidRegister = false;
    this.auth
      .register(
        {
          id: 0,
          email: newUser.email,
          f_name: newUser.firstName,
          l_name: newUser.lastName,
          phone: newUser.phone,
          access: 0,
        },
        newUser.password
      )
      .subscribe(
        (v) => {
          if (v) {
            this.invalidRegister = false;
            this.snackBar.open(
              'Successfully registered! You can now login...',
              'Dismiss',
              { duration: 2000 }
            );
            this.changeTab.emit();
          } else {
            this.invalidRegister = true;
          }
        },
        (v) => (this.invalidRegister = true)
      );
  }
}
