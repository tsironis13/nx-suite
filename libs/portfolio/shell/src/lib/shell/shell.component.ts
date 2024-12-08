import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HeaderNavigationStore } from '@nx-suite/portfolio/shared/domain';
import {
  PortfolioAboutBannerComponent,
  PortfolioAboutComponent,
  PortfolioAwardsComponent,
  PortfolioEducationComponent,
  PortfolioExperienceComponent,
  PortfolioFooterComponent,
  PortfolioHeaderComponent,
  PortfolioHomeComponent,
  PortfolioProjectsComponent,
  PortfolioSkillsComponent,
  PortfolioTechStackComponent,
} from '@nx-suite/portfolio/shared/ui';
import { NxSuiteUiScrollTopComponent } from '@nx-suite/shared/ui';

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
    PortfolioSkillsComponent,
    PortfolioTechStackComponent,
    PortfolioFooterComponent,
    NxSuiteUiScrollTopComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  protected readonly isScrollTopVisible = signal(false);
  home = viewChild<PortfolioHomeComponent, ElementRef>(PortfolioHomeComponent, {
    read: ElementRef,
  });
  about = viewChild<PortfolioAboutComponent, ElementRef>(
    PortfolioAboutComponent,
    { read: ElementRef }
  );
  projects = viewChild<PortfolioProjectsComponent, ElementRef>(
    PortfolioProjectsComponent,
    { read: ElementRef }
  );
  experience = viewChild<PortfolioExperienceComponent, ElementRef>(
    PortfolioExperienceComponent,
    { read: ElementRef }
  );
  techStack = viewChild<PortfolioTechStackComponent, ElementRef>(
    PortfolioTechStackComponent,
    { read: ElementRef }
  );

  protected readonly headerNavigationService = inject(HeaderNavigationStore);

  constructor() {
    afterNextRender(() => this.updateComponentsOffsetTop());
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.headerNavigationService.updateActiveItemOnPageScroll(scrollY);
    this.toggleScrollTop();
  }

  private updateComponentsOffsetTop(): void {
    this.headerNavigationService.updateComponentOffsetTop('home', [
      this.home()?.nativeElement.offsetTop,
      this.home()?.nativeElement.offsetHeight,
    ]);
    this.headerNavigationService.updateComponentOffsetTop('about', [
      this.about()?.nativeElement.offsetTop,
      this.about()?.nativeElement.offsetHeight,
    ]);
    this.headerNavigationService.updateComponentOffsetTop('projects', [
      this.projects()?.nativeElement.offsetTop,
      this.projects()?.nativeElement.offsetHeight,
    ]);
    this.headerNavigationService.updateComponentOffsetTop('experience', [
      this.experience()?.nativeElement.offsetTop,
      this.experience()?.nativeElement.offsetHeight,
    ]);
    this.headerNavigationService.updateComponentOffsetTop('techStack', [
      this.techStack()?.nativeElement.offsetTop,
      this.techStack()?.nativeElement.offsetHeight,
    ]);

    this.headerNavigationService.updateActiveItemOnPageScroll(scrollY);
  }

  private toggleScrollTop(): void {
    this.isScrollTopVisible.set(scrollY > 500);
  }
}
