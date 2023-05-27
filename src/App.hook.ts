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
  const [fromMoney, setFromMoney] = useState<Money>();
  const [toCurrency, setToCurrency] = useState<Currency>(
    getCurrencyFromCode(config.defaultToCurrencyCode)
  );
  const [toAmount, setToAmount] = useState<number>();
  const [rate, setRate] = useState<Rate>();

  const initialize = useCallback(async () => {
    const selection = await requestSelection();
    setSelection(selection);
  }, []);

  useEffect(() => {
    (async () => {
      const money = await createMoneyFromString(selection);
      setFromMoney(money);

      if (!money) {
        return;
      }

      const { rate, result } = await translateMoney(money, toCurrency.code);
      setRate(rate);
      setToAmount(result);
    })();
  }, [selection, toCurrency]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const changeToCurrencyCode = (code: CurrencyCode) => {
    setToCurrency(getCurrencyFromCode(code));
  };

  return {
    fromMoney,
    toCurrency,
    toAmount,
    rate,
    changeToCurrencyCode,
  };
}
