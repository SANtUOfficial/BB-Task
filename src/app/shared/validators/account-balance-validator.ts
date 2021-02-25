import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const accountBalanceValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const balance = control.get('accountBalance').value;
  const amountToTranfer = control.get('amount').value;

  if (amountToTranfer > balance) {
    return { inSufficientBalance: true };
  }
  return null;
};
