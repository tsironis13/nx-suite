import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  InputSignal,
} from '@angular/core';
import { TuiLink } from '@taiga-ui/core';

interface HoverableCardComponent {
  imageUrl: InputSignal<string>;
  title: InputSignal<string>;
  subtitle: InputSignal<string>;
  height: InputSignal<number>;
  details: InputSignal<{ link: string } | null>;
  backgroundHoverColor: InputSignal<string>;
}

@Component({
  selector: 'nx-suite-ui-hoverable-card',
  standalone: true,
  imports: [NgOptimizedImage, TuiLink],
  templateUrl: './hoverable-card.component.html',
  styleUrls: ['./hoverable-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiHovarableCardComponent implements HoverableCardComponent {
  public readonly height = input.required<number>();
  public readonly imageUrl = input('');
  public readonly title = input('');
  public readonly subtitle = input('');
  public readonly details = input<{ link: string } | null>(null);
  public readonly backgroundHoverColor = input('');

  @HostBinding('attr.style')
  public get cssVars() {
    return `--background-hover-color: #${this.backgroundHoverColor()}`;
  }
}
