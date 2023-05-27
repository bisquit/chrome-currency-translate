import { anyOf, createRegExp, digit, maybe, oneOrMore } from 'magic-regexp';

/**
 * Return currency and amount from string
 */
export function extractCurrency(str: string) {
  const regex = createRegExp(
    anyOf('$').groupedAs('symbol'),
    oneOrMore(digit)
      .and(maybe('.', oneOrMore(digit)))
      .groupedAs('amount')
  );
  const match = str.match(regex);
  return {
    symbol: match?.groups.symbol,
    amount: match?.groups.amount,
  };
}
