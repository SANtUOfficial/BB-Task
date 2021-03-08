import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ACCOUNT_BALANCE } from '../shared/constant';
import { TransactionNotifierService } from '../shared/services/transaction-notifier.service';
import { accountBalanceValidator } from '../shared/validators/account-balance-validator';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss'],
})
export class MoneyTransferComponent implements OnInit {
  moneyTransferForm: FormGroup;
  submitted = false;
  accountBalance = ACCOUNT_BALANCE;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notiferService: TransactionNotifierService
  ) {}

  ngOnInit(): void {
    this.moneyTransferForm = this.formBuilder.group(
      {
        accountBalance: [this.accountBalance],
        accountName: [''],
        amount: ['', [Validators.required]],
      },
      { validators: [accountBalanceValidator] }
    );
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.moneyTransferForm.controls;
  }
  get inSufficientBalance(): boolean {
    return this.moneyTransferForm.errors?.inSufficientBalance;
  }

  onSubmit(targetModal?: any): void {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.isFormValid()) {
      return;
    }

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  transferAmount(): void {
    this.modalService.dismissAll();
    this.debtFromAccount();
    this.updateTransactionHistory();
    this.resetFormControls();
  }

  resetFormControls(): void {
    this.moneyTransferForm.reset();

    this.moneyTransferForm.controls.accountBalance.setValue(
      this.accountBalance
    );
    this.moneyTransferForm.controls.amount.markAsPristine();
    this.moneyTransferForm.controls.amount.setValidators([Validators.required]);
    this.moneyTransferForm.updateValueAndValidity();
  }

  isFormValid(): boolean {
    return this.moneyTransferForm.valid;
  }

  debtFromAccount(): void {
    this.accountBalance =
      this.moneyTransferForm.value.accountBalance -
      this.moneyTransferForm.value.amount;
  }
  updateTransactionHistory(): void {
    const amount = this.moneyTransferForm.value.amount;
    const name = this.moneyTransferForm.value.accountName || '';
    const transactionDate = this.getTransactionDate();

    const obj = {
      id: uuidv4(),
      merchant: {
        name,
      },
      dates: {
        valueDate: transactionDate,
      },
      categoryCode: '#e25a2c',
      transaction: {
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
        amountCurrency: {
          currencyCode: 'EUR',
          amount,
        },
      },
    };

    this.notiferService.nofifyUpdate(obj);
  }
  private getTransactionDate(): string {
    const date = new Date();
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
}
