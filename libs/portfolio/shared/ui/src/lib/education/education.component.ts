import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.less',
  imports: [TuiIcon, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioEducationComponent {}
