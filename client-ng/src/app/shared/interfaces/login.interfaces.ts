import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormControls } from './forms.interfaces';

export type LoginFormGroup = FormGroup<LoginForm>;

export type LoginForm = FormControls<LoginData>;

export interface LoginData {
  email: string;
  password: string;
}

export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
  const password: string = control.value;

  const errors = new Map<PasswordValidationError, boolean>();

  if (password.length < 8) {
    errors.set(PasswordValidationError.MinLength, true);
  }

  if (!/[a-zа-я]/.test(password)) {
    errors.set(PasswordValidationError.Lowercase, true);
  }

  if (!/[A-ZА-Я]/.test(password)) {
    errors.set(PasswordValidationError.Uppercase, true);
  }

  if (!/\d/.test(password)) {
    errors.set(PasswordValidationError.Digit, true);
  }

  if (!/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(password)) {
    errors.set(PasswordValidationError.SpecialChar, true);
  }

  return errors.size > 0 ? { password: Object.fromEntries(errors.entries()) } : null;
};

export enum PasswordValidationError {
  MinLength = 'minLength',
  Lowercase = 'lowercase',
  Uppercase = 'uppercase',
  Digit = 'digit',
  SpecialChar = 'specialChar',
}
