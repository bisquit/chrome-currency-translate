import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Currency,
  Money,
  Rate,
  getCurrencyFromCode,
  getCurrencyFromSymbolPatterns,
  getCurrencyRate,
} from '../core';
import { createMoney } from '../core/create-money';
import { extractMoneyComponents } from '../core/extract-money-components';
import { requestSelection } from '../utils/chrome/send-message';

export function useCurrencyTranslate() {
  const [selection, setSelection] = useState('');
  const [fromMoney, setFromMoney] = useState<Money>();
  const [toCurrency, setToCurrency] = useState<Currency>(
    getCurrencyFromCode('JPY')
  );
  const [rate, setRate] = useState<Rate>();

  const initialize = useCallback(async () => {
    const selection = await requestSelection();
    setSelection(selection);
  }, []);

  useEffect(() => {
    (async () => {
      const { amount, symbol } = extractMoneyComponents(selection);

      if (amount === undefined) {
        return;
      }

      if (symbol === undefined) {
        return;
      }

      const currency = getCurrencyFromSymbolPatterns(symbol);
      const money = createMoney(amount, currency);
      setFromMoney(money);

      const rate = await getCurrencyRate(
        money.currency.code.toLowerCase(),
        toCurrency.code.toLowerCase()
      );
      setRate(rate);
    })();
  }, [selection, toCurrency]);

  const toAmount = useMemo(() => {
    if (!rate || !fromMoney) {
      return undefined;
    }

    return fromMoney.amount * rate.value;
  }, [fromMoney, rate]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    fromMoney,
    toCurrency,
    toAmount,
    rate,
  };
}
