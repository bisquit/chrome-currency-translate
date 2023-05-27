import { getCurrencyFromSymbolPatterns } from '../core/currencies';
import { extractMoneyComponents } from '../core/extract-money-components';
import { Money } from '../core/types';

/**
 * Create money instance from given string.
 */
export async function createMoneyFromString(
  string: string
): Promise<Money | undefined> {
  const { amount, symbol } = extractMoneyComponents(string);

  if (amount === undefined) {
    return;
  }

  if (symbol === undefined) {
    return;
  }

  return {
    amount,
    currency: getCurrencyFromSymbolPatterns(symbol),
  };
}
