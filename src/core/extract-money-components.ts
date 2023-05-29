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

type Component = {
  symbol: string;
  amount: number;
};

/**
 * Return money related components from string
 */
export function extractMoneyComponents(str: string): Component[] {
  // remove any spacing or line breaks
  // this is for some cases like space between symbol (e.g. `A $`)
  // also, it makes more simple for match pattern regex
  const sanitizedStr = str.replace(
    createRegExp(anyOf(' ', linefeed, carriageReturn), ['g', 'm']),
    ''
  );

  const prefixSymbolPatterns = currencies.flatMap(
    (v) => v.prefixSymbolPatterns
  );
  const postfixSymbolPatterns = currencies.flatMap(
    (v) => v.postfixSymbolPatterns
  );

  const regex = createRegExp(
    maybe(anyOf(...prefixSymbolPatterns).groupedAs('symbolPrefix')),
    oneOrMore(anyOf(digit, ','))
      .and(maybe('.', oneOrMore(digit)))
      .groupedAs('amount'),
    maybe(anyOf(...postfixSymbolPatterns).groupedAs('symbolPostfix')),
    ['g']
  );

  const matches = sanitizedStr.matchAll(regex);
  if (!matches) {
    return [];
  }

  const components = [...matches]
    .map((match) => {
      const symbol = match.groups.symbolPrefix || match.groups.symbolPostfix;

      const amount =
        match.groups.amount !== undefined
          ? sanitizeAmount(match.groups.amount)
          : undefined;

      return {
        symbol,
        amount,
      };
    })
    .filter(
      (component) =>
        // current regex pattern matches just an amount (e.g. `100`),
        // but it should not be considered as money,
        // so filter out here
        component.amount !== undefined && component.symbol !== undefined
    );

  return components as Component[];
}

function sanitizeAmount(strAmount: string): number {
  const strResult = strAmount.replaceAll(',', '');
  const numResult = Number(strResult);
  return numResult;
}
