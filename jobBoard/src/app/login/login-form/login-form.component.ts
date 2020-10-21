import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  invalidLogin = false;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.invalidLogin = false;
    this.auth.login(email, password).subscribe(
      (v) => {
        if (v) {
          this.snackBar.open('Successfully logged in!', 'Dismiss', {
            duration: 2000,
          });
          if (this.auth.isAdmin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.invalidLogin = true;
        }
      },
      (v) => {
        this.invalidLogin = true;
      }
    );
  }
}
