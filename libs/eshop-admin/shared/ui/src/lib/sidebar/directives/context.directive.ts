import { Directive, WritableSignal } from '@angular/core';

export type SidebarContext = {
  expanded: WritableSignal<boolean>;
};

export interface SidebarTemplateContext {
  $implicit: SidebarContext;
}

@Directive({
  selector: '[eshopAdminSidebarContext]',
  standalone: true,
})
export class SidebarContextDirective {
  static ngTemplateContextGuard(
    _dir: SidebarContextDirective,
    ctx: SidebarTemplateContext
  ): ctx is SidebarTemplateContext {
    return true;
  }
}
