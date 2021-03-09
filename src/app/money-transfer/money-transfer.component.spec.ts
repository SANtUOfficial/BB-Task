import { CUSTOM_ELEMENTS_SCHEMA, Directive, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrefixTextPipe } from '../shared/pipes/prefix-text.pipe';

import { MoneyTransferComponent } from './money-transfer.component';

describe('MoneyTransferComponent', () => {
  let component: MoneyTransferComponent;
  let fixture: ComponentFixture<MoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneyTransferComponent, PrefixTextPipe],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should change the value of submitted, onSubmit trigger', () => {
    component.submitted = false;
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });

  it('should return form status', () => {
    const isFormValid = component.isFormValid();
    expect(isFormValid).toBeFalsy();
  });

  it('should reset the form status', () => {
    component.submitted = true;
    component.resetFormControls();
    expect(component.submitted).toBeFalsy();
  });

  it('should transfer amount from the account', () => {
    spyOn(component, 'updateAccountBalance');
    spyOn(component, 'resetFormControls');
    component.transferAmount();
    expect(component.updateAccountBalance).toHaveBeenCalled();
    expect(component.resetFormControls).toHaveBeenCalled();
  });
  it('should debt from the account', () => {
    component.accountBalance = 500;
    component.moneyTransferForm.setValue({
      accountBalance: 500,
      accountName: '',
      amount: 200,
    });

    component.updateAccountBalance();
    expect(component.accountBalance).toEqual(300);
  });
});
