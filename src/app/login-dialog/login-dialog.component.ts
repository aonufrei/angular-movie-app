import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createPasswordValidator} from "../validators/password-validators";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  hidePassword: boolean = true

  form: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.min(6)]],
      password: ['', [Validators.required, createPasswordValidator()]]
    },
    null
  );

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private fb: FormBuilder,
              public authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  login() {
    const success = this.authService.login(this.username?.value || "", this.password?.value || "")
    this._snackBar.open(success ? `Welcome, ${this.authService.currentUser.username}` : "Failed to login with provided credentials",
      undefined, {
        duration: 3000, // Set duration to 3 seconds
      });
    this.dialogRef.close()
  }

  goToRegister() {
    this.dialogRef.close({action: 'register'});
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
