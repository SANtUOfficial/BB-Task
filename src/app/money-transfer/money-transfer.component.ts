import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { accountBalanceValidator } from '../shared/validators/account-balance-validator';
import { minimumBalanceValidator } from '../shared/validators/min-balance-validator';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss'],
})
export class MoneyTransferComponent implements OnInit {
  moneyTransferForm: FormGroup;
  submitted = false;
  accountBalance = 5824.76;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.moneyTransferForm = this.formBuilder.group(
      {
        accountBalance: [5824.76],
        accountName: [''],
        amount: ['', [Validators.required]],
      },
      { validators: [accountBalanceValidator, minimumBalanceValidator] }
    );

    console.log('OnInit', this.moneyTransferForm.value);
  }

  get formControls() {
    return this.moneyTransferForm.controls;
  }
  get inSufficientBalance() {
    return this.moneyTransferForm.errors?.inSufficientBalance;
  }
  get minBalanceRequired() {
    return this.moneyTransferForm.errors?.minBalanceRequired;
  }

  onSubmit(targetModal) {
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

  transferAmount() {
    this.modalService.dismissAll();
    this.debtFromAccount();
    this.resetFormControls();
  }

  public resetFormControls() {
    this.moneyTransferForm.reset();
    this.moneyTransferForm.markAsUntouched();

    Object.keys(this.moneyTransferForm.controls).forEach((name) => {
      const control = this.formControls[name];
      control.setErrors(null);
    });
    this.moneyTransferForm.controls.accountBalance.setValue(
      this.accountBalance
    );
  }

  public isFormValid() {
    return this.moneyTransferForm.valid;
  }

  debtFromAccount() {
    this.accountBalance =
      this.moneyTransferForm.value.accountBalance -
      this.moneyTransferForm.value.amount;
  }
}
