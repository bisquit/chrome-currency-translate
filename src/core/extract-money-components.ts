import {
  anyOf,
  carriageReturn,
  createRegExp,
  digit,
  linefeed,
  maybe,
  oneOrMore,
} from 'magic-regexp';

import { currencies } from '../core/currencies';

/**
 * Return money related components from string
 */
export function extractMoneyComponents(str: string) {
  // remove any spacing or line breaks
  // this is for some cases like space between symbol (e.g. `A $`)
  // also, it makes more simple for match pattern regex
  const sanitizedStr = str.replace(
    createRegExp(anyOf(' ', linefeed, carriageReturn), ['g', 'm']),
    ''
  );

  const symbolPatterns = currencies.flatMap((v) => v.symbolPatterns);

  const regex = createRegExp(
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPrefix')),
    oneOrMore(anyOf(digit, ','))
      .and(maybe('.', oneOrMore(digit)))
      .groupedAs('amount'),
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPostfix'))
  );

  const match = sanitizedStr.match(regex);
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
