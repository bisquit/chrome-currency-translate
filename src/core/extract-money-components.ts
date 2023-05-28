import { anyOf, createRegExp, digit, maybe, oneOrMore } from 'magic-regexp';
import { currencies } from '../core/currencies';

/**
 * Return money related components from string
 */
export function extractMoneyComponents(str: string) {
  const symbolPatterns = currencies.flatMap((v) => v.symbolPatterns);

  const regex = createRegExp(
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPrefix')),
    maybe(' '),
    oneOrMore(anyOf(digit, ','))
      .and(maybe('.', oneOrMore(digit)))
      .groupedAs('amount'),
    maybe(' '),
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPostfix'))
  );

  const match = str.match(regex);
  if (!match) {
    return {
      symbol: undefined,
      amount: undefined,
    };
  }

  const symbol = match.groups.symbolPrefix || match.groups.symbolPostfix;

  const amount =
    match.groups.amount !== undefined
      ? sanitizeAmount(match.groups.amount)
      : undefined;

  return {
    symbol,
    amount,
  };
}

function sanitizeAmount(strAmount: string): number {
  const strResult = strAmount.replaceAll(',', '');
  const numResult = Number(strResult);
  return numResult;
}
