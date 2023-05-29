import { getCurrencyFromSymbolPatterns } from '../core/currencies';
import { extractMoneyComponents } from '../core/extract-money-components';
import { Money } from '../core/types';

/**
 * Create money instances from given string.
 */
export async function createMoneyFromString(
  string: string
): Promise<Money[] | undefined> {
  const result = extractMoneyComponents(string);

  if (result.length === 0) {
    return;
  }

  const money = result.map((v) => ({
    amount: v.amount,
    currency: getCurrencyFromSymbolPatterns(v.symbol),
  }));

  return money;
}
