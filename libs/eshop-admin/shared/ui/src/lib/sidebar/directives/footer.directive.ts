import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[eshopAdminSidebarFooter]',
  standalone: true,
})
export class SidebarFooterDirective<T> {
  templateRef = inject<TemplateRef<T>>(TemplateRef<T>);
}
