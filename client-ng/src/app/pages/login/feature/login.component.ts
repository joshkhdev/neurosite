import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { AuthSessionDto, AuthUserDto } from '@api/models';
import {
  LoginForm,
  LoginFormGroup,
  PasswordValidationError,
  passwordValidator,
} from '@shared/data-access/models';
import { AuthService } from '@shared/data-access/services';
import { StorageHelper } from '@shared/utils';
import { LibraryModule } from '@shared/lib/library.module';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LibraryModule, ReactiveFormsModule],
})
export class LoginComponent {
  protected readonly loginFormGroup: LoginFormGroup;

  protected readonly PasswordErrorEnum = PasswordValidationError;

  protected readonly isLoading$ = signal<boolean>(false);

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginFormGroup = this.fb.group<LoginForm>({
      email: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control<string>('', [Validators.required, passwordValidator]),
    });
  }

  public login(): void {
    if (this.loginFormGroup.invalid) {
      return;
    }

    const user: AuthUserDto = {
      email: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value,
    };

    this.isLoading$.set(true);

    this.authService
      .signIn(user)
      .pipe(
        finalize(() => this.isLoading$.set(false)),
        take(1)
      )
      .subscribe((session: AuthSessionDto) => {
        StorageHelper.writeSession(session);

        this.router.navigateByUrl('/');
      });
  }

  public passwordHasError(error: PasswordValidationError): boolean {
    return this.passwordErrors ? this.passwordErrors[error] : false;
  }

  private get passwordErrors(): ValidationErrors | null {
    return this.loginFormGroup.controls.password.errors?.['password'];
  }
}
