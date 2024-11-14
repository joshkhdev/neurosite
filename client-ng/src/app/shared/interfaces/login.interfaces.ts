import { FormGroup } from '@angular/forms';
import { FormControls } from './forms.interfaces';

export type LoginFormGroup = FormGroup<LoginForm>;
export type LoginForm = FormControls<LoginData>;

export interface LoginData {
  email: string;
  password: string;
}
