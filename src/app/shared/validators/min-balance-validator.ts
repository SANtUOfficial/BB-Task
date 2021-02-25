import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const minimumBalance = 500;
export const minimumBalanceValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const balance = control.get('accountBalance').value;
  const amountToTranfer = control.get('amount').value;

  if (balance > amountToTranfer && balance - amountToTranfer < minimumBalance) {
    return { minBalanceRequired: true };
  }
  return null;
};
