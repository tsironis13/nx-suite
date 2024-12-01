import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.less',
  imports: [TuiIcon, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioExperienceComponent {}
