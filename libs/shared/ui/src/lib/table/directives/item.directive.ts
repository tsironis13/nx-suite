import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nxSuiteUiTableItem]',
  standalone: true,
})
export class NxSuiteUiTableItemDirective<T> {
  templateRef = inject<TemplateRef<T>>(TemplateRef<T>);
}
