import { expect, test } from 'vitest';

import { getCurrencyRate } from './get-currency-rate';

test('getCurrencyRate', async () => {
  const rate = await getCurrencyRate('USD', 'JPY');
  expect(typeof rate.from).toBe('string');
  expect(typeof rate.to).toBe('string');
  expect(typeof rate.value).toBe('number');
  expect(typeof rate.date).toBe('string');
});
