import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { awards } from '@nx-suite/portfolio/shared/domain';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-awards',
  standalone: true,
  imports: [NgOptimizedImage, TuiIcon],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAwardsComponent {
  protected readonly awards = signal(awards).asReadonly();
}
