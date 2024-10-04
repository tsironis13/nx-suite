import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { NxSuiteUiBreadcrumbComponent } from '@nx-suite/shared/ui';
import { CaptionLink } from '@nx-suite/shared/util';
import { TuiNavigation } from '@taiga-ui/layout';

interface NavigationComponent {
  title: InputSignal<string>;
  navigationBreadcrumbLinks: InputSignal<CaptionLink[]>;
}

@Component({
  selector: 'eshop-admin-navigation',
  standalone: true,
  imports: [CommonModule, TuiNavigation, NxSuiteUiBreadcrumbComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  providers: [NxSuiteUiBreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EshopAdminNavigationComponent implements NavigationComponent {
  public readonly title = input.required<string>();
  public readonly navigationBreadcrumbLinks = input.required<CaptionLink[]>();
}
