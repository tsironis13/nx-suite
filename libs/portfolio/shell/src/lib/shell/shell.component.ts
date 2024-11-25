import { Component } from '@angular/core';
import {
  PortfolioHeaderComponent,
  PortfolioHomeComponent,
} from '@nx-suite/portfolio/shared/ui';

@Component({
  selector: 'portfolio-shell',
  standalone: true,
  imports: [PortfolioHeaderComponent, PortfolioHomeComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {}
