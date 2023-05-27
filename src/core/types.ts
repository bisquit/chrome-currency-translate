import { Currency } from './currencies';

/**
 * Money representes amount and currency, such as $10
 */
export type Money = {
  amount: number;
  currency: Currency;
};

export type Rate = {
  date: string;
  value: number;
};
