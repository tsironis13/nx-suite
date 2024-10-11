import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaptionLink, TextSize } from '@nx-suite/shared/util';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiLink } from '@taiga-ui/core';
import { TuiBreadcrumbs } from '@taiga-ui/kit';

interface BreadcrumbComponent<T> {
  items: InputSignal<T[]>;
  size: InputSignal<TextSize>;
}

@Component({
  selector: 'nx-suite-ui-breadcrumb',
  standalone: true,
  imports: [NgFor, RouterLink, TuiBreadcrumbs, TuiItem, TuiLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiBreadcrumbComponent<T extends CaptionLink>
  implements BreadcrumbComponent<T>
{
  public readonly items = input.required<T[]>();
  public readonly size = input<TextSize>('m');
}
