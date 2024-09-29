import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  EshopAdminAsideComponent,
  EshopAdminHeaderComponent,
  EshopAdminNavigationComponent,
  SidebarContextDirective,
  SidebarFooterDirective,
  SidebarHeaderDirective,
  SidebarTemplateContext,
} from '@nx-suite/eshop-admin/shared/ui';
import { TuiScrollbar } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'eshop-admin-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TuiScrollbar,
    TuiNavigation,
    EshopAdminHeaderComponent,
    EshopAdminAsideComponent,
    EshopAdminNavigationComponent,
    SidebarContextDirective,
    SidebarHeaderDirective,
    SidebarFooterDirective,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  protected readonly headerTemplate = viewChild<
    SidebarHeaderDirective<SidebarTemplateContext>
  >(SidebarHeaderDirective<SidebarTemplateContext>);
  protected readonly footerTemplate = viewChild<
    SidebarFooterDirective<SidebarTemplateContext>
  >(SidebarFooterDirective<SidebarTemplateContext>);
}
