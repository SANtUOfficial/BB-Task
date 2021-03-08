import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TransactionItem } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionNotifierService {
  private subject = new Subject<TransactionItem>();
  constructor() {}

  nofifyUpdate(transaction): void {
    this.subject.next(transaction);
  }
  getTransactionDetails(): Observable<any> {
    return this.subject.asObservable();
  }
}
