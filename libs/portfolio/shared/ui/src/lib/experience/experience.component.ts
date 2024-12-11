import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { experience } from '@nx-suite/portfolio/shared/domain';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.less',
  imports: [TuiIcon, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioExperienceComponent {
  protected readonly experience = signal(experience).asReadonly();
}
