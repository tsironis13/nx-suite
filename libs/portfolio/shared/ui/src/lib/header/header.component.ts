import { NgClass, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HeaderNavigationStore,
  socialNetworks,
} from '@nx-suite/portfolio/shared/domain';
import { NxSuiteUiSocialNetworksComponent } from '@nx-suite/shared/ui';
import { SocialNetworkItem } from '@nx-suite/shared/util';
import { TuiButton, TuiDataList, TuiLink } from '@taiga-ui/core';
import { TuiHeader, TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'portfolio-header',
  standalone: true,
  imports: [
    TuiHeader,
    TuiButton,
    TuiDataList,
    NgClass,
    FormsModule,
    TuiLink,
    TuiNavigation,
    NgOptimizedImage,
    NxSuiteUiSocialNetworksComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'flex',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHeaderComponent {
  protected readonly open = signal(false);
  protected readonly socialNetworkItems: Signal<SocialNetworkItem[]> =
    signal(socialNetworks).asReadonly();

  protected readonly headerNavigationService = inject(HeaderNavigationStore);

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.headerNavigationService.enableStickyHeader();
  }

  constructor() {
    afterNextRender(() => {
      this.headerNavigationService.enableStickyHeader();
    });
  }

  public closeSidebar(): void {
    if (this.open()) {
      this.open.set(false);
    }
  }
}
