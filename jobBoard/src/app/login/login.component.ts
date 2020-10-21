import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  selected = new FormControl(0);

  constructor() {}

  ngOnInit(): void {}

  switchTab(): void {
    if (this.selected.value === 1) {
      this.selected.setValue(0);
    } else {
      this.selected.setValue(1);
    }
  }
}
