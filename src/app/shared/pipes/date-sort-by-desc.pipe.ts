import { Pipe, PipeTransform } from '@angular/core';
import { TransactionItem } from '../types/types';

@Pipe({
  name: 'dateSortByDesc',
})
export class DateSortByDescPipe implements PipeTransform {
  transform(value: TransactionItem[] = []): TransactionItem[] {
    return value.sort((value1: TransactionItem, value2: TransactionItem) => {
      const date1 = new Date(value1.dates.valueDate);
      const date2 = new Date(value2.dates.valueDate);
      return date1 < date2 ? 1 : -1;
    });
  }
}
