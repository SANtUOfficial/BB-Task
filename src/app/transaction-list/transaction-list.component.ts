import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionItem } from '../shared/types/types';
import { TransactionService } from './transaction.service';
import { map, filter } from 'rxjs/operators';
import { TransactionNotifierService } from '../shared/services/transaction-notifier.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactionHistory: TransactionItem[];
  initialTransactionHistory: TransactionItem[];
  transactionHistorySubscription$: Subscription;
  notifierServiceSubscription$: Subscription;
  filterString: string;

  constructor(
    private transactionService: TransactionService,
    private notifierService: TransactionNotifierService
  ) {}

  ngOnInit(): void {
    this.transactionHistorySubscription$ = this.transactionService
      .getTransactionHistory()
      .subscribe((data: any) => {
        this.initialTransactionHistory = data;
        this.transactionHistory = [...data];
      });
    this.notifierServiceSubscription$ = this.notifierService
      .getTransactionDetails()
      .subscribe((transactionObj) => {
        this.transactionHistory = [...this.transactionHistory, transactionObj];
        this.initialTransactionHistory = [
          ...this.initialTransactionHistory,
          transactionObj,
        ];
      });
  }

  filterValue(value: string): void {
    this.filterString = value;
  }

  ngOnDestroy(): void {
    this.transactionHistorySubscription$.unsubscribe();
    this.notifierServiceSubscription$.unsubscribe();
  }
}
