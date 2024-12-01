import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-awards',
  standalone: true,
  imports: [NgOptimizedImage, TuiIcon],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAwardsComponent {}
