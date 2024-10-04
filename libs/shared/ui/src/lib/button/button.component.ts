import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { ButtonAppearance, ButtonSize } from '@nx-suite/shared/util';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

interface ButtonComponent {
  size: InputSignal<ButtonSize>;
  appearance: InputSignal<ButtonAppearance>;
  disabled: InputSignal<boolean>;
}

@Component({
  selector: 'nx-suite-ui-button',
  standalone: true,
  imports: [TuiButton, TuiIcon],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiButtonComponent implements ButtonComponent {
  public readonly size = input<ButtonSize>('xs');
  public readonly appearance = input<ButtonAppearance>('accent');
  public readonly disabled = input<boolean>(false);

  public readonly onClick = output<void>();
}
