import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
} from '@angular/core';
import { profile, socialNetworks } from '@nx-suite/portfolio/shared/domain';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiSocialNetworksComponent,
} from '@nx-suite/shared/ui';
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
    NxSuiteUiButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHomeComponent {
  protected readonly profile = signal(profile).asReadonly();
  protected readonly socialNetworkItems: Signal<SocialNetworkItem[]> =
    signal(socialNetworks).asReadonly();

  protected onCvDownload(): void {
    const link = document.createElement('a');
    link.download = 'Ioannis-Tsironis-CV.pdf';
    link.href = '/Ioannis-Tsironis-CV.pdf';
    link.click();
  }
}
