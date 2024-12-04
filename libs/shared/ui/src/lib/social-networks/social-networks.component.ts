import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import {
  SocialNetworkItem,
  SocialNetworkItemsOrientation,
} from '@nx-suite/shared/util';
import { TuiLink } from '@taiga-ui/core';

interface SocialNetworksComponent {
  transparentBackground: InputSignal<boolean>;
  squareBackgroundOnHover: InputSignal<boolean>;
  orientation: InputSignal<SocialNetworkItemsOrientation>;
  items: InputSignal<SocialNetworkItem[]>;
}

@Component({
  selector: 'nx-suite-ui-social-networks',
  standalone: true,
  imports: [TuiLink],
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiSocialNetworksComponent
  implements SocialNetworksComponent
{
  public readonly orientation = input.required<SocialNetworkItemsOrientation>();
  public readonly items = input.required<SocialNetworkItem[]>();
  public readonly transparentBackground = input<boolean>(false);
  public readonly squareBackgroundOnHover = input<boolean>(false);
}
