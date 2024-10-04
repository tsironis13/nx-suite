import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderNavigationStore } from '@nx-suite/eshop-admin/shared/domain';
import {
  EshopAdminAsideComponent,
  EshopAdminHeaderComponent,
  EshopAdminNavigationComponent,
  SidebarContextDirective,
  SidebarFooterDirective,
  SidebarHeaderDirective,
  SidebarTemplateContext,
} from '@nx-suite/eshop-admin/shared/ui';
import { NxSuiteUiBreadcrumbComponent } from '@nx-suite/shared/ui';
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
    NxSuiteUiBreadcrumbComponent,
  ],
  providers: [HeaderNavigationStore],
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

  protected readonly headerNavigation = inject(HeaderNavigationStore);
}
