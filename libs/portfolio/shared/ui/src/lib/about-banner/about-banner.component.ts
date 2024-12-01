import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'portfolio-about-banner',
  standalone: true,
  templateUrl: './about-banner.component.html',
  styleUrl: './about-banner.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAboutBannerComponent {}
