import invariant from 'tiny-invariant';

/**
 * code - ISO 4217 currency codes
 * symbol - currency symbol
 * symbolPatterns - allowed symbols for the currency
 */
export const currencies = [
  {
    code: 'USD',
    symbol: '$',
    symbolPatterns: ['$'],
  },
  {
    code: 'EUR',
    symbol: '€',
    symbolPatterns: ['€'],
  },
  {
    code: 'JPY',
    symbol: '¥',
    symbolPatterns: ['¥', '円'],
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
  const currency = currencies.find((v) =>
    v.symbolPatterns.some((p) => p === symbol)
  );
  invariant(currency);
  return currency;
}

export function getDefaultCurrency(): Currency {
  return getCurrencyFromCode('USD');
}
