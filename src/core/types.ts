import { Currency, CurrencyCode } from './currencies';

/**
 * Money representes amount and currency, such as $10
 */
export type Money = {
  amount: number;
  currency: Currency;
};

export type Rate = {
  from: CurrencyCode;
  to: CurrencyCode;
  date: string;
  value: number;
};
