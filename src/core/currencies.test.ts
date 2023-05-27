import { expect, test } from 'vitest';
import {
  getCurrencyFromCode,
  getCurrencyFromSymbol,
  getCurrencyFromSymbolPatterns,
} from './currencies';

test('getCurrencyFromCode', async () => {
  const currency = getCurrencyFromCode('USD');
  expect(currency.code).toBe('USD');
});

test('getCurrencyFromSymbol', async () => {
  const currency = getCurrencyFromSymbol('$');
  expect(currency.symbol).toBe('$');
});

test('getCurrencyFromSymbolPatterns', async () => {
  const currency = getCurrencyFromSymbolPatterns('円');
  expect(currency.code).toBe('JPY');

  const currency2 = getCurrencyFromSymbolPatterns('¥');
  expect(currency2.code).toBe('JPY');
});
