import { Pipe, PipeTransform } from '@angular/core';
import { TransactionItem } from '../types/types';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: TransactionItem[] = [],
    args: string = ''
  ): TransactionItem[] {
    return value.filter((item: TransactionItem) => {
      return item.merchant.name?.toLowerCase().includes(args.toLowerCase());
    });
  }
}
