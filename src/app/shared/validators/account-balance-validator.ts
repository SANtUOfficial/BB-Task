import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { OVERDUE_AMOUNT } from '../constant';

export const accountBalanceValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const balance = control.get('accountBalance').value;
  const amountToTranfer = control.get('amount').value;

  if (amountToTranfer > balance + OVERDUE_AMOUNT) {
    return { inSufficientBalance: true };
  }
  return null;
};
