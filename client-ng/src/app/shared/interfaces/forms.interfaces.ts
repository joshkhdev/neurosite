import { FormControl } from '@angular/forms';

export type FormControls<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type FormControlsNullable<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
