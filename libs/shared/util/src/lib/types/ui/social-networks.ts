import { RequireAtLeastOne } from '../utils';

export type SocialNetworkItemsOrientation = 'horizontal' | 'vertical';

type SocialNetwork = {
  link: string;
  background: string;
  icon?: string;
  customImage?: { url: string; alt: string };
};

export type SocialNetworkItem = RequireAtLeastOne<
  SocialNetwork,
  'icon' | 'customImage'
>;
