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
    this.toggleScrollTop();
    this.updateComponentsOffsetTop();
    this.headerNavigationService.updateActiveItemOnPageScroll(scrollY);
  }

  private updateComponentsOffsetTop(): void {
    this.updateHomeOffsetTop();
    this.updateAboutOffsetTop();
    this.updateProjectsOffsetTop();
    this.updateExperienceOffsetTop();
    this.updateTechStackOffsetTop();

    this.headerNavigationService.updateActiveItemOnPageScroll(scrollY);
  }

  private toggleScrollTop(): void {
    this.isScrollTopVisible.set(scrollY > 500);
  }

  private updateHomeOffsetTop(): void {
    const homeBoundaries =
      this.headerNavigationService.scrollingState()
        .componentsOffsetTopOffsetHeightBoundaries['home'];

    const homeOffsetTop = this.home()?.nativeElement.offsetTop;
    const homeOffsetHeight = this.home()?.nativeElement.offsetHeight;

    if (
      homeBoundaries &&
      (homeOffsetTop !== homeBoundaries[0] ||
        homeOffsetHeight !== homeBoundaries[1])
    ) {
      this.headerNavigationService.updateComponentOffsetTop('home', [
        homeOffsetTop,
        homeOffsetHeight,
      ]);
    }
  }

  private updateAboutOffsetTop(): void {
    const aboutBoundaries =
      this.headerNavigationService.scrollingState()
        .componentsOffsetTopOffsetHeightBoundaries['about'];

    const aboutOffsetTop = this.about()?.nativeElement.offsetTop;
    const aboutOffsetHeight = this.about()?.nativeElement.offsetHeight;

    if (!aboutOffsetTop || !aboutOffsetHeight) {
      return;
    }

    if (aboutBoundaries && aboutBoundaries[0] !== 0) {
      return;
    }

    this.headerNavigationService.updateComponentOffsetTop('about', [
      aboutOffsetTop,
      aboutOffsetHeight,
    ]);
  }

  private updateProjectsOffsetTop(): void {
    const projectsBoundaries =
      this.headerNavigationService.scrollingState()
        .componentsOffsetTopOffsetHeightBoundaries['projects'];

    const projectsOffsetTop = this.projects()?.nativeElement.offsetTop;
    const projectsOffsetHeight = this.projects()?.nativeElement.offsetHeight;

    if (!projectsOffsetTop || !projectsOffsetHeight) {
      return;
    }

    if (projectsBoundaries && projectsBoundaries[0] !== 0) {
      return;
    }

    this.headerNavigationService.updateComponentOffsetTop('projects', [
      projectsOffsetTop,
      projectsOffsetHeight,
    ]);
  }

  private updateExperienceOffsetTop(): void {
    const experienceBoundaries =
      this.headerNavigationService.scrollingState()
        .componentsOffsetTopOffsetHeightBoundaries['experience'];

    const experienceOffsetTop = this.experience()?.nativeElement.offsetTop;
    const experienceOffsetHeight =
      this.experience()?.nativeElement.offsetHeight;

    if (!experienceOffsetTop || !experienceOffsetHeight) {
      return;
    }

    if (experienceBoundaries && experienceBoundaries[0] !== 0) {
      return;
    }

    this.headerNavigationService.updateComponentOffsetTop('experience', [
      experienceOffsetTop,
      experienceOffsetHeight,
    ]);
  }

  private updateTechStackOffsetTop(): void {
    const techStackBoundaries =
      this.headerNavigationService.scrollingState()
        .componentsOffsetTopOffsetHeightBoundaries['techStack'];

    const techStackOffsetTop = this.techStack()?.nativeElement.offsetTop;
    const techStackOffsetHeight = this.techStack()?.nativeElement.offsetHeight;

    if (!techStackOffsetTop || !techStackOffsetHeight) {
      return;
    }

    if (techStackBoundaries && techStackBoundaries[0] !== 0) {
      return;
    }

    this.headerNavigationService.updateComponentOffsetTop('techStack', [
      techStackOffsetTop,
      techStackOffsetHeight,
    ]);
  }
}
