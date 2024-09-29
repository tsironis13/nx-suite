import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[eshopAdminSidebarHeader]',
  standalone: true,
})
export class SidebarHeaderDirective<T> {
  templateRef = inject<TemplateRef<T>>(TemplateRef<T>);
}
