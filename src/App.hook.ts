import { useCallback, useEffect, useState } from 'react';

import { Currency, CurrencyCode, getCurrencyFromCode } from './core/currencies';
import { Money, Rate } from './core/types';
import { createMoneyFromString } from './usecases/create-money-from-string';
import { translateMoney } from './usecases/translate-money';
import { requestSelection } from './utils/chrome/send-message';

export function useCurrencyTranslate(config: {
  defaultToCurrencyCode: CurrencyCode;
}) {
  const [selection, setSelection] = useState('');
  const [toCurrency, setToCurrency] = useState<Currency>(
    getCurrencyFromCode(config.defaultToCurrencyCode)
  );
  const [rows, setRows] = useState<
    { fromMoney: Money; rate: Rate; toAmount: number }[]
  >([]);

  const initialize = useCallback(async () => {
    const selection = await requestSelection();
    setSelection(selection);
  }, []);

  useEffect(() => {
    (async () => {
      const money = await createMoneyFromString(selection);
      if (!money) {
        setRows([]);
        return;
      }

      const rows = await Promise.all(
        money.map(async (v) => {
          const { rate, result } = await translateMoney(v, toCurrency.code);
          return {
            fromMoney: v,
            rate,
            toAmount: result,
          };
        })
      );
      setRows(rows);
    })();
  }, [selection, toCurrency]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const changeToCurrencyCode = (code: CurrencyCode) => {
    setToCurrency(getCurrencyFromCode(code));
  };

  return {
    rows,
    toCurrency,
    changeToCurrencyCode,
  };
}
