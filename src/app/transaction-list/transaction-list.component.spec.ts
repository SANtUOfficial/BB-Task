import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateSortByDescPipe } from './../shared/pipes/date-sort-by-desc.pipe';
import { TransactionListComponent } from './transaction-list.component';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TransactionListComponent, DateSortByDescPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter data based filter criteria', () => {
    component.initialTransactionHistory = [
      {
        id: 'bfc6c9ee-1f3d-4521-84a0-052e67b23e9b',
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1600493600000,
        },
        categoryCode: '#12a580',
        transaction: {
          type: 'Salaries',
          creditDebitIndicator: 'CRDT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: 5000,
          },
        },
      },
      {
        id: '82b94da0-795a-4b14-81d6-defd4619d7e4',
        merchant: {
          name: 'H&M Online Store',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1602633600000,
        },
        categoryCode: '#e25a2c',
        transaction: {
          type: 'Online Transfer',
          creditDebitIndicator: 'DBIT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: '19.72',
          },
        },
      },
    ];

    const expected = [
      {
        id: 'bfc6c9ee-1f3d-4521-84a0-052e67b23e9b',
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1600493600000,
        },
        categoryCode: '#12a580',
        transaction: {
          type: 'Salaries',
          creditDebitIndicator: 'CRDT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: 5000,
          },
        },
      },
    ];
    component.transactionHistory = [];
    const filterValue = 'backbase';
    component.filterTransactions(filterValue);
    expect(component.transactionHistory).toEqual(expected);
  });
});
