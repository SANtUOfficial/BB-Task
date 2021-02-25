import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionItem } from '../shared/types/types';
import { TransactionService } from './transaction.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  transactionHistory: TransactionItem[];
  initialTransactionHistory: TransactionItem[];
  transactionHistorySubscription$: Subscription;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionHistorySubscription$ = this.transactionService
      .getTransactionHistory()
      .subscribe((data: any) => {
        this.initialTransactionHistory = data;
        this.transactionHistory = [...data];
      });
  }

  filterTransactions(value) {
    this.transactionHistory = this.initialTransactionHistory.filter(
      (item: TransactionItem) => {
        return item.merchant.name.toLowerCase().includes(value.toLowerCase());
      }
    );
  }
  ngOnDestroy() {
    this.transactionHistorySubscription$.unsubscribe();
  }
}
