import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

function createPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null) {
      return { passwordStrength: true };
    }
    const hasAppropriateLength = value.length >= 6;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSymbol = /[!%@#$^*?_~]+/.test(value);
    const passwordValid =
      hasAppropriateLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSymbol;
    return passwordValid ? null : { passwordStrength: true };
  };
}

function matchPassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  if (password != confirm) {
    return { noMatch: true };
  }

  return null;
}

export { createPasswordValidator, matchPassword }
