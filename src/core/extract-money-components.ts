import { anyOf, createRegExp, digit, maybe, oneOrMore } from 'magic-regexp';
import { currencies } from '../core/currencies';

/**
 * Return money related components from string
 */
export function extractMoneyComponents(str: string) {
  const symbolPatterns = currencies.flatMap((v) => v.symbolPatterns);

  const regex = createRegExp(
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPrefix')),
    oneOrMore(digit)
      .and(maybe('.', oneOrMore(digit)))
      .groupedAs('amount'),
    maybe(anyOf(...symbolPatterns).groupedAs('symbolPostfix'))
  );

  const match = str.match(regex);

  return {
    symbol: match?.groups.symbolPrefix || match?.groups.symbolPostfix,
    amount: match?.groups.amount ? Number(match.groups.amount) : undefined,
  };
}
