import { Directive, input, InputSignal } from '@angular/core';
import { Entity } from '@nx-suite/shared/util';

interface TableItemContextDirective<T> {
  item: InputSignal<T | undefined>;
}

export type NxSuiteUiTableItemContext<T> = {
  item: T;
};

export interface NxSuiteUiTableItemTemplateContext<T> {
  $implicit: NxSuiteUiTableItemContext<T>;
}

@Directive({
  selector: '[nxSuiteUiTableItemContext]',
  standalone: true,
})
export class NxSuiteUiTableItemContextDirective<Z extends Entity>
  implements TableItemContextDirective<Z>
{
  public item = input<Z>();

  static ngTemplateContextGuard<Z extends Entity>(
    _dir: NxSuiteUiTableItemContextDirective<Z>,
    ctx: NxSuiteUiTableItemTemplateContext<Z>
  ): ctx is NxSuiteUiTableItemTemplateContext<Z> {
    return true;
  }
}
