import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AuthDialogComponent>
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onAuthenticate() {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      this.authService.authenticate(username, password).subscribe(
        id => {
          if (id > 0) {
            this.dialogRef.close(id);
          } else {
            this.dialogRef.close(false);
          }
        },
        error => {
          console.error('Authentication error:', error);
          this.dialogRef.close(false);
        }
      );
    }
  }
}
