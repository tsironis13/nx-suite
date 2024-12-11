import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { stack } from '@nx-suite/portfolio/shared/domain';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell } from '@taiga-ui/layout';

@Component({
  selector: 'portfolio-tech-stack',
  standalone: true,
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.less',
  imports: [TuiAvatar, TuiAppearance, TuiCardLarge, TuiTitle, TuiCell],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioTechStackComponent {
  protected readonly stack = signal(stack).asReadonly();
}
