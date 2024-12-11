import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { projects } from '@nx-suite/portfolio/shared/domain';
import { NxSuiteUiHovarableCardComponent } from '@nx-suite/shared/ui';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'portfolio-projects',
  standalone: true,
  imports: [NxSuiteUiHovarableCardComponent, TuiTabs],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioProjectsComponent {
  protected readonly activeTabIndex = signal(0);
  protected readonly activeProjects = computed(() =>
    this.hoverableCards().filter(
      (c) => !this.activeTabIndex() || c.tabIndex === this.activeTabIndex()
    )
  );
  protected readonly hoverableCards = signal(projects).asReadonly();
}
