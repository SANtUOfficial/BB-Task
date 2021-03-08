import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const mockData = [
      {
        id: 'dfa045c5-8c9f-4729-9290-51921ce69d15',
        merchant: {
          name: 'Texaco',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1599955200000,
        },
        categoryCode: '#d51271',
        transaction: {
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: '84.64',
          },
        },
      },
      {
        id: 'd700d514-d4d2-46da-9ba3-9ece448bff5c',
        merchant: {
          name: 'Southern Electric Company',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1599868800000,
        },
        categoryCode: '#fbbb1b',
        transaction: {
          type: 'Online Transfer',
          creditDebitIndicator: 'DBIT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: '142.95',
          },
        },
      },
    ];
    const expected = [
      {
        id: 'dfa045c5-8c9f-4729-9290-51921ce69d15',
        merchant: {
          name: 'Texaco',
          accountNumber: 'SI64397745065188826',
        },
        dates: {
          valueDate: 1599955200000,
        },
        categoryCode: '#d51271',
        transaction: {
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
          amountCurrency: {
            currencyCode: 'EUR',
            amount: '84.64',
          },
        },
      },
    ];
    const pipe = new FilterPipe();
    const actual = pipe.transform(mockData, 'te');
    expect(actual).toEqual(expected);
  });
});
