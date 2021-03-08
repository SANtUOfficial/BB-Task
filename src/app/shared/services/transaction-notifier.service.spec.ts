import { TestBed } from '@angular/core/testing';

import { TransactionNotifierService } from './transaction-notifier.service';

describe('TransactionNotifierService', () => {
  let service: TransactionNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
