import { Component } from '@angular/core';
import {
  PortfolioAboutBannerComponent,
  PortfolioAboutComponent,
  PortfolioAwardsComponent,
  PortfolioEducationComponent,
  PortfolioExperienceComponent,
  PortfolioHeaderComponent,
  PortfolioHomeComponent,
  PortfolioProjectsComponent,
} from '@nx-suite/portfolio/shared/ui';

@Component({
  selector: 'portfolio-shell',
  standalone: true,
  imports: [
    PortfolioHeaderComponent,
    PortfolioHomeComponent,
    PortfolioAboutComponent,
    PortfolioAboutBannerComponent,
    PortfolioProjectsComponent,
    PortfolioAwardsComponent,
    PortfolioExperienceComponent,
    PortfolioEducationComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {}
