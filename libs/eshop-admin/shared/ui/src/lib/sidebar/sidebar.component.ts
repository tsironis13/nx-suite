import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  InputSignal,
  model,
  viewChild,
} from '@angular/core';
import {
  tuiButtonOptionsProvider,
  tuiDropdownOptionsProvider,
} from '@taiga-ui/core';
import { TuiAsideComponent, TuiNavigation } from '@taiga-ui/layout';
import { SidebarFooterDirective, SidebarHeaderDirective } from './directives';
import { SidebarTemplateContext } from './directives/context.directive';

interface SidebarComponent {
  expanded: InputSignal<boolean>;
  headerTemplate: InputSignal<
    SidebarHeaderDirective<SidebarTemplateContext> | undefined
  >;
  footerTemplate: InputSignal<
    SidebarFooterDirective<SidebarTemplateContext> | undefined
  >;
}

@Component({
  selector: 'eshop-admin-aside',
  standalone: true,
  imports: [
    TuiNavigation,
    SidebarHeaderDirective,
    SidebarFooterDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [
    tuiButtonOptionsProvider({ size: 's', appearance: 'flat' }),
    tuiDropdownOptionsProvider({
      appearance: 'dropdown-navigation',
      align: 'right',
      offset: 12,
    }),
    {
      provide: TuiAsideComponent,
      useExisting: EshopAdminAsideComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EshopAdminAsideComponent
  extends TuiAsideComponent
  implements SidebarComponent
{
  public override readonly expanded = model<boolean>(false);
  public readonly headerTemplate =
    input<SidebarHeaderDirective<SidebarTemplateContext>>();
  public readonly footerTemplate =
    input<SidebarFooterDirective<SidebarTemplateContext>>();

  protected readonly defaultHeaderTemplate = viewChild.required<
    SidebarHeaderDirective<SidebarTemplateContext>
  >(SidebarHeaderDirective<SidebarTemplateContext>);
  protected readonly defaultFooterTemplate = viewChild.required<
    SidebarFooterDirective<SidebarTemplateContext>
  >(SidebarFooterDirective<SidebarTemplateContext>);

  protected readonly injector = inject(Injector);
}
