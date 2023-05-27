import { expect, test } from 'vitest';
import { extractCurrency } from './extract-currency';

test('extract', async () => {
  const actual = extractCurrency('$8.25');
  expect(actual).toEqual({
    amount: '8.25',
    symbol: '$',
  });
});
