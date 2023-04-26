import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createPasswordValidator, matchPassword} from "../validators/password-validators";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserRole} from "../common/User";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {


  hidePassword: boolean = true
  hideConfirmPassword: boolean = true

  form: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.min(6)]],
      password: ['', [Validators.required, createPasswordValidator()]],
      confirmPassword: ['', [Validators.required, createPasswordValidator()]]
    },
    [matchPassword]
  );

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>,
              private fb: FormBuilder,
              public authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  register() {
    const success = this.authService.register(this.username?.value || "", this.password?.value || "", UserRole.REGULAR)
    this._snackBar.open(success ? `You successfully registered` : "Failed to register with provided credentials",
      undefined, {
        duration: 3000, // Set duration to 3 seconds
      });
    this.dialogRef.close()
  }

  goToLogin() {
    this.dialogRef.close({action: 'login'});
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

}
