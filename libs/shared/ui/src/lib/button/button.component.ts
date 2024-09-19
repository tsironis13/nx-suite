import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { ButtonAppearance, ButtonSizes } from './types';

@Component({
  selector: 'nx-suite-ui-button',
  standalone: true,
  imports: [TuiButton, TuiIcon],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public readonly size = input<ButtonSizes>('xs');
  public readonly appearance = input<ButtonAppearance>('accent');
}
