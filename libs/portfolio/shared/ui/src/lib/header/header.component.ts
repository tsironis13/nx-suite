import { NgClass, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderNavigationStore } from '@nx-suite/portfolio/shared/domain';
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
  protected readonly socialNetworkItems: WritableSignal<SocialNetworkItem[]> =
    signal([
      {
        link: 'https://www.linkedin.com/',
        background: '#0077b5',
        icon: '@tui.linkedin',
      },
      {
        link: 'https://stackoverflow.com/questions/40336155/binding-appending-to-href',
        background: '#1877f2',
        icon: '@tui.facebook',
      },
      {
        link: 'https://stackoverflow.com/questions/40336155/binding-appending-to-href',
        background: '#e7700d',
        customImage: {
          url: './assets/images/stackoverflow-icon3.png',
          alt: 'stackoverflow',
        },
      },
    ]);

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
}
