import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  authForm: FormGroup;

  //project: Project;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //this.project = data.project;
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
