import { extractCurrency } from '../utils/extract-currency';

export function createCurrencyFromString(str: string) {
  const { symbol, amount } = extractCurrency(str);

  return {
    symbol,
    amount: amount ? Number(amount) : undefined,
    code: symbol ? getCodeFromSymbol(symbol) : undefined,
  };
}

function getCodeFromSymbol(symbol: string) {
  return 'USD';
}
