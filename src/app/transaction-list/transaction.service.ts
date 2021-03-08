import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionItem } from '../shared/types/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  /** GET transaction data from the server */
  getTransactionHistory(): Observable<TransactionItem[]> {
    return this.http.get<TransactionItem[]>('assets/data.json');
  }
}
