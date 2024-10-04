import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ToStringPipe } from '@nx-suite/shared/util';
import { TuiLet } from '@taiga-ui/cdk';
import { TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

interface UiInputComponent<T> {
  fControl: InputSignal<{
    key: keyof T;
    validators:
      | ((control: AbstractControl) => ValidationErrors | null)[]
      | null;
    placeHolder: string;
    defaultValue: { [K in keyof T]: T[K] };
  }>;
}

@Component({
  selector: 'nx-suite-ui-input',
  standalone: true,
  imports: [
    AsyncPipe,
    TuiTextfieldControllerModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputModule,
    ReactiveFormsModule,
    TuiLet,
    ToStringPipe,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiInputComponent<T>
  implements UiInputComponent<T>, OnInit, OnDestroy
{
  public readonly fControl = input.required<{
    key: keyof T;
    validators:
      | ((control: AbstractControl) => ValidationErrors | null)[]
      | null;
    placeHolder: string;
    defaultValue: { [K in keyof T]: T[K] };
  }>();

  readonly #parentFormContainer = inject(ControlContainer);
  readonly #fb = inject(FormBuilder);

  ngOnInit(): void {
    this.addControl();
  }

  ngOnDestroy(): void {
    this.removeControl();
  }

  private addControl(): void {
    const control = this.fControl();

    this.getParentFormGroup().addControl(
      control.key as string,
      this.#fb.control(
        control.defaultValue[control.key] || null,
        control.validators
      )
    );
  }

  private removeControl(): void {
    this.getParentFormGroup().removeControl(this.fControl().key as string);
  }

  private getParentFormGroup() {
    return this.#parentFormContainer.control as FormGroup;
  }
}
