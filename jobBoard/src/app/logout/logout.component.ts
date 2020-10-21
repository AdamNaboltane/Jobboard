import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.auth.logout();
    this.snackBar.open('Successfully logged you out!', 'Dismiss', {
      duration: 2000,
    });
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
