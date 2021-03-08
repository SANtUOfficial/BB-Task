import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefixText',
})
export class PrefixTextPipe implements PipeTransform {
  transform(value: number): string {
    return `My Personal Account: €${value}`;
  }
}
