import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
} from '@angular/core';
import {
  ButtonAppearance,
  ButtonIcon,
  ButtonSize,
} from '@nx-suite/shared/util';
import { TuiButton } from '@taiga-ui/core';

interface ButtonComponent {
  size: InputSignal<ButtonSize>;
  appearance: InputSignal<ButtonAppearance>;
  disabled: InputSignal<boolean>;
  iconButton: InputSignal<ButtonIcon | null>;
}

@Component({
  selector: 'nx-suite-ui-button',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiButtonComponent implements ButtonComponent {
  public readonly size = input<ButtonSize>('xs');
  public readonly appearance = input<ButtonAppearance>('accent');
  public readonly disabled = input<boolean>(false);
  public readonly iconButton = input<ButtonIcon | null>(null);

  public readonly onClick = output<void>();

  protected iconButtonStart = computed(
    () => this.iconButton()?.iconStart as string
  );
}
