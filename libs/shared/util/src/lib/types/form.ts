import { AbstractControl, FormGroup } from '@angular/forms';
import { Primitive } from './common';

export type FormGroupMap<T> = {
  [K in keyof T]: T[K] extends Primitive
    ? AbstractControl<T[K]>
    : FormGroup<FormGroupMap<T[K]>>;
};
