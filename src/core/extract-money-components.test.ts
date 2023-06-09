import { describe, expect, test } from 'vitest';

import { extractMoneyComponents } from './extract-money-components';

test('only amount should not be money', async () => {
  const actual = extractMoneyComponents('100');
  expect(actual).toEqual([]);
});

test('only symbol should not be money', async () => {
  const actual = extractMoneyComponents('$');
  expect(actual).toEqual([]);
});

test('zero', async () => {
  const actual = extractMoneyComponents('$0');
  expect(actual).toEqual([
    {
      amount: 0,
      symbol: '$',
    },
  ]);
});

test('comma separator', async () => {
  const actual = extractMoneyComponents('$1,114,114.25');
  expect(actual).toEqual([
    {
      amount: 1114114.25,
      symbol: '$',
    },
  ]);
});

test('space or line breaks between currency and amount', async () => {
  const actual = extractMoneyComponents('$ 100');
  expect(actual).toEqual([
    {
      amount: 100,
      symbol: '$',
    },
  ]);

  const actual2 = extractMoneyComponents('100,000    円');
  expect(actual2).toEqual([
    {
      amount: 100000,
      symbol: '円',
    },
  ]);

  const actual3 = extractMoneyComponents(`
    A
    $6
  `);
  expect(actual3).toEqual([
    {
      amount: 6,
      symbol: 'A$',
    },
  ]);

  const actual4 = extractMoneyComponents(`
    100
    
        円
  `);
  expect(actual4).toEqual([
    {
      amount: 100,
      symbol: '円',
    },
  ]);
});

test('multiple', async () => {
  const actual = extractMoneyComponents('$100 $200');
  expect(actual).toEqual([
    {
      amount: 100,
      symbol: '$',
    },
    {
      amount: 200,
      symbol: '$',
    },
  ]);
});

describe('USD', () => {
  test('$', async () => {
    const actual = extractMoneyComponents('$8.25');
    expect(actual).toEqual([
      {
        amount: 8.25,
        symbol: '$',
      },
    ]);
  });
  test('US$', async () => {
    const actual = extractMoneyComponents('US$8.25');
    expect(actual).toEqual([
      {
        amount: 8.25,
        symbol: 'US$',
      },
    ]);
  });
});

describe('AUD', () => {
  test('A$', async () => {
    const actual = extractMoneyComponents('A$8.25');
    expect(actual).toEqual([
      {
        amount: 8.25,
        symbol: 'A$',
      },
    ]);
  });
});

describe('CAD', () => {
  test('C$', async () => {
    const actual = extractMoneyComponents('C$8.25');
    expect(actual).toEqual([
      {
        amount: 8.25,
        symbol: 'C$',
      },
    ]);
  });
});

describe('GBP', () => {
  test('£', async () => {
    const actual = extractMoneyComponents('£4.15');
    expect(actual).toEqual([
      {
        amount: 4.15,
        symbol: '£',
      },
    ]);
  });
});

describe('EUR', () => {
  test('€', async () => {
    const actual = extractMoneyComponents('€9.99');
    expect(actual).toEqual([
      {
        amount: 9.99,
        symbol: '€',
      },
    ]);
  });
});

describe('JPY', () => {
  test('¥', async () => {
    const actual = extractMoneyComponents('¥1200');
    expect(actual).toEqual([
      {
        amount: 1200,
        symbol: '¥',
      },
    ]);
  });
  test('￥', async () => {
    const actual = extractMoneyComponents('￥223');
    expect(actual).toEqual([
      {
        amount: 223,
        symbol: '￥',
      },
    ]);
  });
  test('円', async () => {
    const actual = extractMoneyComponents('1200円');
    expect(actual).toEqual([
      {
        amount: 1200,
        symbol: '円',
      },
    ]);
  });
});
