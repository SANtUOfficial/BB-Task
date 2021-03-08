export interface TransactionItem {
  id: string;
  merchant: {
    name: string;
    accountNumber?: string;
  };
  dates: {
    valueDate: number | Date;
  };
  categoryCode: string;
  transaction: {
    type?: string;
    creditDebitIndicator: string;
    amountCurrency: {
      currencyCode: string;
      amount: string | number;
    };
  };
}
