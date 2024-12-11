import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { profile } from '@nx-suite/portfolio/shared/domain';

@Component({
  selector: 'portfolio-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAboutComponent {
  protected readonly profile = signal(profile).asReadonly();
}
