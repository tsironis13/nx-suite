import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TuiLoader } from '@taiga-ui/core';

interface UiLoaderComponent {
  showLoader: InputSignal<boolean>;
  overlay: InputSignal<boolean>;
  inheritColor: InputSignal<boolean>;
}

@Component({
  selector: 'nx-suite-ui-loader',
  standalone: true,
  imports: [TuiLoader],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiLoaderComponent implements UiLoaderComponent {
  public readonly showLoader = input.required<boolean>();
  public readonly overlay = input.required<boolean>();
  public readonly inheritColor = input<boolean>(true);
}
