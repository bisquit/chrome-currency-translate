import { describe, expect, test } from 'vitest';
import { extractMoneyComponents } from './extract-money-components';

describe('USD', () => {
  test('$', async () => {
    const actual = extractMoneyComponents('$8.25');
    expect(actual).toEqual({
      amount: 8.25,
      symbol: '$',
    });
  });
});

describe('EUR', () => {
  test('€', async () => {
    const actual = extractMoneyComponents('€9.99');
    expect(actual).toEqual({
      amount: 9.99,
      symbol: '€',
    });
  });
});

describe('JPY', () => {
  test('円', async () => {
    const actual = extractMoneyComponents('1200円');
    expect(actual).toEqual({
      amount: 1200,
      symbol: '円',
    });
  });
  test('¥', async () => {
    const actual = extractMoneyComponents('¥1200');
    expect(actual).toEqual({
      amount: 1200,
      symbol: '¥',
    });
  });
});
