import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MoneyTransferComponent } from './money-transfer.component';

describe('MoneyTransferComponent', () => {
  let component: MoneyTransferComponent;
  let fixture: ComponentFixture<MoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneyTransferComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open review transer modal if the form is valid', () => {
    let el: ElementRef;
    spyOn(component, 'isFormValid').and.returnValue(true);
    component.onSubmit(el);
    expect(component.submitted).toBe(true);
  });

  it('should return form status', () => {
    const isFormValid = component.isFormValid();
    expect(isFormValid).toBeFalsy();
  });

  it('should reset the form', () => {
    component.resetFormControls();
    expect(component.moneyTransferForm.status).toEqual('VALID');
  });

  it('should transfer amount from the account', () => {
    spyOn(component, 'debtFromAccount');
    spyOn(component, 'resetFormControls');
    component.transferAmount();
    expect(component.debtFromAccount).toHaveBeenCalled();
    expect(component.resetFormControls).toHaveBeenCalled();
  });
  it('should debt from the account', () => {
    component.accountBalance = 500;
    component.moneyTransferForm.setValue({
      accountBalance: 500,
      accountName: '',
      amount: 200,
    });

    component.debtFromAccount();
    expect(component.accountBalance).toEqual(300);
  });
});
