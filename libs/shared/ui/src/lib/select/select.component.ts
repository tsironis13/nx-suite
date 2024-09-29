import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Entity } from '@nx-suite/shared/util';
import { TuiContext, tuiPure, TuiValueChanges } from '@taiga-ui/cdk';
import { TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

interface UiSelectComponent<T, K> {
  data: InputSignal<T[]>;
  dataLabelKey: InputSignal<K>;
  fControl: InputSignal<{
    key: string;
    validators: ((control: AbstractControl) => ValidationErrors | null) | null;
    defaultValue?: unknown;
  }>;
}

@Component({
  selector: 'nx-suite-ui-select',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiValueChanges,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiSelectComponent<T extends Entity, K extends keyof T>
  implements UiSelectComponent<T, K>, OnInit, OnDestroy
{
  readonly data = input.required<T[]>();
  readonly dataLabelKey = input.required<K>();
  readonly fControl = input.required<{
    key: string;
    validators: ((control: AbstractControl) => ValidationErrors | null) | null;
    defaultValue?: unknown;
  }>();
  onSelectionChange = output<number | string>();

  readonly #parentFormContainer = inject(ControlContainer);
  readonly #fb = inject(FormBuilder);

  @tuiPure
  protected stringify(items: readonly T[]) {
    const map = new Map<string | number, T[K]>(
      items.map((item) => [item.id, item[this.dataLabelKey()]])
    );

    return ({ $implicit }: TuiContext<number>) => map.get($implicit) || '';
  }

  ngOnInit(): void {
    this.addControl();
  }

  ngOnDestroy(): void {
    this.removeControl();
  }

  onChanges(value: number | string) {
    this.onSelectionChange.emit(value);
  }

  private addControl(): void {
    const control = this.fControl();

    this.getParentFormGroup().addControl(
      control.key,
      this.#fb.control(control.defaultValue || null, control.validators)
    );
  }

  private removeControl(): void {
    this.getParentFormGroup().removeControl(this.fControl().key);
  }

  private getParentFormGroup() {
    return this.#parentFormContainer.control as FormGroup;
  }
}
