import { round } from 'number-precision';

import { CurrencyCode } from '../core/currencies';
import { getCurrencyRate } from '../core/get-currency-rate';
import { Money, Rate } from '../core/types';

/**
 * Translate money and returns result and rate used.
 */
export async function translateMoney(
  money: Money,
  toCurrencyCode: CurrencyCode
): Promise<{ rate: Rate; result: number }> {
  const rate = await getCurrencyRate(money.currency.code, toCurrencyCode);

  let result = money.amount * rate.value;
  result = round(result, 2);

  return {
    rate,
    result,
  };
}
