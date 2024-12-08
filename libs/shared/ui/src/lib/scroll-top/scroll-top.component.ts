import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

interface UiScrollTopComponent {
  isVisible: InputSignal<boolean>;
}

@Component({
  selector: 'nx-suite-ui-scroll-top',
  standalone: true,
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  imports: [TuiIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiScrollTopComponent implements UiScrollTopComponent {
  public readonly isVisible = input.required<boolean>();

  public scrollTop(): void {
    window.scrollTo(0, 0);
  }
}
