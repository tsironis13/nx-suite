import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { NxSuiteUiHovarableCardComponent } from '@nx-suite/shared/ui';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'portfolio-projects',
  standalone: true,
  imports: [NxSuiteUiHovarableCardComponent, TuiTabs],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioProjectsComponent {
  protected readonly activeTabIndex = signal(0);
  protected readonly activeProjects = computed(() =>
    this.hoverableCards.filter(
      (c) => !this.activeTabIndex() || c.tabIndex === this.activeTabIndex()
    )
  );
  protected readonly hoverableCards = [
    {
      tabIndex: 1,
      imageUrl: './assets/images/photo1.jpg',
      backgroundHoverColor: '7ad3ab',
      height: 300,
      title: 'Nx Suite',
      subtitle:
        'dfkj dfkjfd dfjkdfjk fdkjdf fdkjfdjk fdkjfdkj fdjkfdkdsfj dsfsd 433342 sdfsdfsdf sdfsd 323243 fdjkdfjkl djkdfjljlkdf dfkjljlkfd dfljkljkfd dfljkljkdf fdlkjdfjlkjklfd dfljkdfjlkjkldf dfjkldfkj dfkjdfjk dfjkdf',
      details: { link: 'https://taiga-ui.dev/components/link' },
    },
    {
      tabIndex: 2,
      imageUrl: './assets/images/portfolio-img1.jpg',
      backgroundHoverColor: '7ad3ab',
      height: 450,
      title: 'open source 1',
      subtitle:
        'dfkj dfkjfd dfjkdfjk fdkjdf fdkjfdjk fdkjfdkj fdjkfdkj fdjkdfjkl djkdfjljlkdf dfkjljlkfd dfljkljkfd dfljkljkdf fdlkjdfjlkjklfd dfljkdfjlkjkldf dfjkldfkj dfkjdfjk dfjkdf',
      details: { link: 'https://taiga-ui.dev/components/link' },
    },
    {
      tabIndex: 2,
      imageUrl: './assets/images/portfolio-img1.jpg',
      backgroundHoverColor: '7ad3ab',
      height: 450,
      title: 'open source 2',
      subtitle:
        'dfkj dfkjfd dfjkdfjk fdkjdf fdkjfdjk fdkjfdkj fdjkfdkj fdjkdfjkl djkdfjljlkdf dfkjljlkfd dfljkljkfd dfljkljkdf fdlkjdfjlkjklfd dfljkdfjlkjkldf dfjkldfkj dfkjdfjk dfjkdf',
      details: { link: 'https://taiga-ui.dev/components/link' },
    },
    {
      tabIndex: 2,
      imageUrl: './assets/images/portfolio-img1.jpg',
      backgroundHoverColor: '7ad3ab',
      height: 450,
      title: 'open source 3',
      subtitle:
        'dfkj dfkjfd dfjkdfjk fdkjdf fdkjfdjk fdkjfdkj fdjkfdkj fdjkdfjkl djkdfjljlkdf dfkjljlkfd dfljkljkfd dfljkljkdf fdlkjdfjlkjklfd dfljkdfjlkjkldf dfjkldfkj dfkjdfjk dfjkdf',
      details: { link: 'https://taiga-ui.dev/components/link' },
    },
  ];
}
