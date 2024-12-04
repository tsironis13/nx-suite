import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.less',
  imports: [TuiIcon, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSkillsComponent {
  protected readonly skills = signal([
    'Problem Solving',
    'Time Management',
    'Leadership',
    'Critical Thinking',
    'Teamwork',
    'Easily Adaptable',
    'Creative Decision Making',
  ]);

  protected readonly mediumBreakpointMiddleElements = computed(() =>
    this.getMediumBreakpointElements('middle')
  );

  protected readonly mediumBreakpointStartElements = computed(() =>
    this.getMediumBreakpointElements('start')
  );

  protected readonly mediumBreakpointEndElements = computed(() =>
    this.getMediumBreakpointElements('end')
  );

  private getMediumBreakpointElements(
    position: 'start' | 'middle' | 'end'
  ): number[] {
    if (this.skills().length < 5) {
      return [1];
    }
    const rows = Math.ceil(this.skills().length / 3);

    let startIndex = 0;

    if (position === 'middle') {
      startIndex = 1;
    } else if (position === 'end') {
      startIndex = 2;
    }

    const elements = [startIndex];

    for (let i = 1; i < rows; i++) {
      elements.push(elements[i - 1] + 3);
    }

    return elements;
  }
}
