import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
} from '@angular/core';
import { socialNetworks } from '@nx-suite/portfolio/shared/domain';
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
  protected readonly socialNetworkItems: Signal<SocialNetworkItem[]> =
    signal(socialNetworks).asReadonly();
}
