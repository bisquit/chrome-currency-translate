import { Currency, Money } from '.';

export function createMoney(amount: number, currency: Currency): Money {
  return {
    amount,
    currency,
  };
}
