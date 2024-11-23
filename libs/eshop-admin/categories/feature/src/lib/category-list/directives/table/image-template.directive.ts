import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[eshopAdminTableColumnImageTemplate]',
  standalone: true,
})
export class EshopAdminTableColumnImageTemplateDirective<T> {
  templateRef = inject<TemplateRef<T>>(TemplateRef<T>);
}
