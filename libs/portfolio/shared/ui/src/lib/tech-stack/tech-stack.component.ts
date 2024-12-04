import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import { TuiAppearance, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell } from '@taiga-ui/layout';

@Component({
  selector: 'portfolio-tech-stack',
  standalone: true,
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.less',
  imports: [
    TuiIcon,
    TuiAvatar,
    TuiAppearance,
    TuiCardLarge,
    TuiRepeatTimes,
    TuiTitle,
    TuiCell,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioTechStackComponent {
  protected readonly stack = signal([
    {
      title: 'Frameworks',
      subtitle: 'Front-end & Back-end',
      items: [
        'Angular',
        'Analog',
        'AngularJs',
        'VueJs (Intermediate)',
        'Asp.Net MVC (Intermediate)',
      ],
    },
    {
      title: 'Programming Languages',
      subtitle: 'Front-end & Back-end',
      items: [
        'Typescript',
        'Javascript',
        'Python',
        'C#',
        'MySql',
        'Java (Intermediate)',
      ],
    },
    {
      title: 'Database Solutions',
      items: ['Supabse', 'Drizzle', 'MongoDB', 'PostgreSql'],
    },
    {
      title: 'Styling',
      subtitle: 'Responsive Design',
      items: [
        'TailwindCSS',
        'Html5',
        'Css',
        'Scss',
        'Bootstrap',
        'Taiga UI',
        'Angular Material',
      ],
    },
    {
      title: 'Testing',
      items: ['Jest', 'Jasmine', 'Karma', 'Angular Testing Library'],
    },
    {
      title: 'State Management Solutions',
      items: ['NgRx', 'SignalStore', 'Vuex (Intermediate)'],
    },
    {
      title: 'Reactive Extensions',
      items: ['RxJS', 'RxJava (Intermediate)'],
    },
    {
      title: 'Version Control',
      items: ['Git', 'Svn'],
    },
    {
      title: 'Development Tooling',
      items: ['Nx'],
    },
    {
      title: 'API Protocols',
      items: ['tRPC'],
    },
  ]);
}
