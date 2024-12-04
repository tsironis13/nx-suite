import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { NxSuiteUiSocialNetworksComponent } from '@nx-suite/shared/ui';
import { SocialNetworkItem } from '@nx-suite/shared/util';

@Component({
  selector: 'portfolio-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
  imports: [NxSuiteUiSocialNetworksComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioFooterComponent {
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
}
