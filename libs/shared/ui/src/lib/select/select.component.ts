import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
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
import { Entity, ToStringPipe } from '@nx-suite/shared/util';
import { TuiContext, TuiLet, tuiPure, TuiValueChanges } from '@taiga-ui/cdk';
import { TuiError, TuiScrollable, TuiScrollbar } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

interface UiSelectComponent<T, K, Z> {
  data: InputSignal<T[]>;
  dataLabelKey: InputSignal<K>;
  fControl: InputSignal<{
    key: keyof Z;
    validators: ((control: AbstractControl) => ValidationErrors | null) | null;
    defaultValue: { [K in keyof Z]: Z[K] };
  }>;
  clearItem: InputSignal<boolean>;
}

@Component({
  selector: 'nx-suite-ui-select',
  standalone: true,
  imports: [
    AsyncPipe,
    TuiSelectModule,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiScrollable,
    TuiScrollbar,
    TuiValueChanges,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    TuiLet,
    ToStringPipe,
    TuiTextfieldControllerModule,
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
export class NxSuiteUiSelectComponent<T extends Entity, K extends keyof T, Z>
  implements UiSelectComponent<T, K, Z>, OnInit, OnDestroy
{
  public readonly data = input.required<T[]>();
  public readonly dataLabelKey = input.required<K>();
  public readonly fControl = input.required<{
    key: keyof Z;
    validators: ((control: AbstractControl) => ValidationErrors | null) | null;
    defaultValue: { [K in keyof Z]: Z[K] };
  }>();
  public readonly clearItem = input<boolean>(false);

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
