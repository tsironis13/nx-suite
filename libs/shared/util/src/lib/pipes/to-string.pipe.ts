import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toString', standalone: true })
export class ToStringPipe implements PipeTransform {
  transform(input: unknown): string {
    return `${input}`;
  }
}
