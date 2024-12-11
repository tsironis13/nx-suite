import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
} from '@angular/core';
import { profile, socialNetworks } from '@nx-suite/portfolio/shared/domain';
import { NxSuiteUiSocialNetworksComponent } from '@nx-suite/shared/ui';
import { SocialNetworkItem } from '@nx-suite/shared/util';

@Component({
  selector: 'portfolio-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  imports: [
    NgOptimizedImage,
    NxSuiteUiSocialNetworksComponent,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHomeComponent {
  protected readonly profile = signal(profile).asReadonly();
  protected readonly socialNetworkItems: Signal<SocialNetworkItem[]> =
    signal(socialNetworks).asReadonly();
}
