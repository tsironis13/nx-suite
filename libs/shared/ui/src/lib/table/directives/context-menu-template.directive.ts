import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nxSuiteUiTableContextMenuTemplate]',
  standalone: true,
})
export class NxSuiteUiTableContextMenuTemplateDirective<T> {
  templateRef = inject<TemplateRef<T>>(TemplateRef<T>);
}
