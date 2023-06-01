import { useCallback, useEffect, useState } from 'react';

import { Currency, CurrencyCode, getCurrencyFromCode } from './core/currencies';
import { Money, Rate } from './core/types';
import { createMoneyFromString } from './usecases/create-money-from-string';
import { translateMoney } from './usecases/translate-money';
import { requestSelection } from './utils/chrome/send-message';

export function useCurrencyTranslate(config: {
  defaultToCurrencyCode: CurrencyCode;
}) {
  const [selection, setSelection] = useState<string>();
  const [toCurrency, setToCurrency] = useState<Currency>(
    getCurrencyFromCode(config.defaultToCurrencyCode)
  );
  const [rows, setRows] = useState<
    { fromMoney: Money; rate: Rate; toAmount: number }[]
  >([]);
  const [translating, setTranslating] = useState(false);
  const [money, setMoney] = useState<Money[]>();

  const initialize = useCallback(async () => {
    const selection = await requestSelection();
    setSelection(selection);
  }, []);

  useEffect(() => {
    (async () => {
      if (!selection) {
        return;
      }

      const money = await createMoneyFromString(selection);
      if (!money) {
        setMoney(undefined);
        return;
      }

      setMoney(money);
    })();
  }, [selection]);

  useEffect(() => {
    (async () => {
      if (!money) {
        return;
      }

      setTranslating(true);

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

      setTranslating(false);
      setRows(rows);
    })();
  }, [money, toCurrency]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const changeToCurrencyCode = (code: CurrencyCode) => {
    setToCurrency(getCurrencyFromCode(code));
  };

  return {
    rows,
    toCurrency,
    translating,
    invalidSelection: selection !== undefined && money === undefined,
    changeToCurrencyCode,
  };
}
