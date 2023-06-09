import invariant from 'tiny-invariant';

/**
 * code - ISO 4217 currency codes
 * symbol - currency symbol
 * prefixSymbolPatterns - allowed symbols for the currency (prefixed)
 * postfixSymbolPatterns - allowed symbols for the currency (postfixed)
 */
export const currencies = [
  {
    code: 'USD',
    symbol: '$',
    prefixSymbolPatterns: ['$', 'US$'],
    postfixSymbolPatterns: [],
  },
  {
    code: 'AUD',
    symbol: 'A$',
    prefixSymbolPatterns: ['A$'],
    postfixSymbolPatterns: [],
  },
  {
    code: 'GBP',
    symbol: '£',
    prefixSymbolPatterns: ['£'],
    postfixSymbolPatterns: [],
  },
  {
    code: 'CAD',
    symbol: 'C$',
    prefixSymbolPatterns: ['C$'],
    postfixSymbolPatterns: [],
  },
  {
    code: 'EUR',
    symbol: '€',
    prefixSymbolPatterns: ['€'],
    postfixSymbolPatterns: [],
  },
  {
    code: 'JPY',
    symbol: '¥',
    prefixSymbolPatterns: ['¥', '￥'],
    postfixSymbolPatterns: ['円'],
  },
] as const;

export type Currency = (typeof currencies)[number];
export type CurrencyCode = (typeof currencies)[number]['code'];
export type CurrencySymbol = (typeof currencies)[number]['symbol'];

export function getAllCurrencyCodes() {
  return currencies.map((v) => v.code);
}

export function getCurrencyFromCode(code: CurrencyCode): Currency {
  const currency = currencies.find((v) => v.code === code);
  invariant(currency);
  return currency;
}

export function getCurrencyFromSymbol(symbol: CurrencySymbol): Currency {
  const currency = currencies.find((v) => v.symbol === symbol);
  invariant(currency);
  return currency;
}

export function getCurrencyFromSymbolPatterns(symbol: string) {
  const currency = currencies.find(
    (v) =>
      v.prefixSymbolPatterns.some((p) => p === symbol) ||
      v.postfixSymbolPatterns.some((p) => p === symbol)
  );
  invariant(currency);
  return currency;
}

export function getDefaultCurrency(): Currency {
  return getCurrencyFromCode('USD');
}
