import { describe, expect, test } from 'vitest';
import { extractMoneyComponents } from './extract-money-components';

test('only amount', async () => {
  const actual = extractMoneyComponents('100');
  expect(actual).toEqual({
    amount: 100,
    symbol: undefined,
  });
});

test('only symbol', async () => {
  const actual = extractMoneyComponents('$');
  expect(actual).toEqual({
    amount: undefined,
    symbol: undefined,
  });
});

test('comma separator', async () => {
  const actual = extractMoneyComponents('$1,114,114.25');
  expect(actual).toEqual({
    amount: 1114114.25,
    symbol: '$',
  });
});

test('space between currency and amount', async () => {
  const preSymbol = extractMoneyComponents('$ 100');
  expect(preSymbol).toEqual({
    amount: 100,
    symbol: '$',
  });

  const postSymbol = extractMoneyComponents('100,000 円');
  expect(postSymbol).toEqual({
    amount: 100000,
    symbol: '円',
  });
});

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
  test('¥', async () => {
    const actual = extractMoneyComponents('¥1200');
    expect(actual).toEqual({
      amount: 1200,
      symbol: '¥',
    });
  });
  test('￥', async () => {
    const actual = extractMoneyComponents('￥223');
    expect(actual).toEqual({
      amount: 223,
      symbol: '￥',
    });
  });
  test('円', async () => {
    const actual = extractMoneyComponents('1200円');
    expect(actual).toEqual({
      amount: 1200,
      symbol: '円',
    });
  });
});
