import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiHint, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import {
  LoginForm,
  LoginFormGroup,
  PasswordValidationError,
  passwordValidator,
} from '@shared/data-access/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiHeader,
    TuiHint,
    TuiIcon,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
  ],
})
export class LoginComponent {
  protected readonly loginFormGroup: LoginFormGroup;

  protected readonly PasswordErrorEnum = PasswordValidationError;

  constructor(private readonly fb: FormBuilder) {
    this.loginFormGroup = this.fb.group<LoginForm>({
      email: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control<string>('', [Validators.required, passwordValidator]),
    });
  }

  public login(): void {
    if (this.loginFormGroup.invalid) {
      return;
    }

    // TODO
  }

  public passwordHasError(error: PasswordValidationError): boolean {
    return this.passwordErrors ? this.passwordErrors[error] : false;
  }

  private get passwordErrors(): ValidationErrors | null {
    return this.loginFormGroup.controls.password.errors?.['password'];
  }
}
