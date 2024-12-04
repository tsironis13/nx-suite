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
  selector: 'portfolio-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  imports: [NgOptimizedImage, NxSuiteUiSocialNetworksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHomeComponent {
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
