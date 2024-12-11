import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { eduction } from '@nx-suite/portfolio/shared/domain';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.less',
  imports: [TuiIcon, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioEducationComponent {
  protected readonly education = signal(eduction).asReadonly();
}
