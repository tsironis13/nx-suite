import { SocialNetworkItem } from '@nx-suite/shared/util';

export const socialNetworks: SocialNetworkItem[] = [
  {
    link: 'https://www.linkedin.com/in/giannis-tsironis/',
    background: '#0077b5',
    icon: '@tui.linkedin',
  },
  {
    link: 'https://github.com/tsironis13',
    background: '#000',
    icon: '@tui.github',
  },
  {
    link: 'https://stackoverflow.com/users/3884310/tsiro',
    background: '#e7700d',
    customImage: {
      url: 'stackoverflow-icon3.png',
      alt: 'stackoverflow',
    },
  },
  {
    link: 'https://www.facebook.com/giannis.tsirob',
    background: '#1877f2',
    icon: '@tui.facebook',
  },
];
