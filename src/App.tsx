import { useEffect, useMemo, useState } from 'react';
import { createCurrencyFromString } from './usecases/create-currency-from-string';
import { getCurrentTab } from './utils/chrome/get-current-tab';
import { openLink } from './utils/chrome/open-link';
import { getCurrencyRate } from './utils/get-currency-rate';

function App() {
  const [selectedMoney, setSelectedMoney] = useState<number>();
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [rate, setRate] = useState<{ date: string; value: number }>();

  const translatedMoney = useMemo(() => {
    if (!rate || !selectedMoney) {
      return undefined;
    }

    return selectedMoney * rate.value;
  }, [rate, selectedMoney]);

  const getSelection = async () => {
    const currentTabId = (await getCurrentTab())?.id;
    if (!currentTabId) {
      return;
    }

    const { selection } = await chrome.tabs.sendMessage(currentTabId, {
      type: 'CURRENCY_TRANSLATE.HELLO',
    });

    // TODO: sanitize, retrive from currency
    const currency = createCurrencyFromString(selection);

    const selectedMoney = currency.amount;
    const fromCurrency = currency.code;
    const toCurrency = 'JPY';
    setSelectedMoney(selectedMoney);
    setFromCurrency(fromCurrency);
    setToCurrency(toCurrency);

    if (fromCurrency && toCurrency) {
      const rate = await getCurrencyRate(
        fromCurrency.toLowerCase(),
        toCurrency.toLowerCase()
      );
      setRate(rate);
    }
  };

  useEffect(() => {
    getSelection();
  }, []);

  return (
    <>
      <div className="min-w-[300px] p-4">
        <p className="mb-2">
          Translate from {fromCurrency} to {toCurrency}
        </p>
        <div className="px-2 text-center">
          <p className="whitespace-nowrap text-3xl font-bold">
            {selectedMoney} {fromCurrency} ≒ {translatedMoney} {toCurrency}
          </p>
        </div>
        <div className="grid place-items-end mt-2 pt-2 border-t border-gray text-xs text-gray">
          {rate && (
            <p>
              1&nbsp;{fromCurrency} = {rate.value}&nbsp;{toCurrency} (
              {rate.date})
            </p>
          )}
          <p>
            <a
              className="underline"
              href="https://github.com/fawazahmed0/currency-api"
              target="_top"
              onClick={(e) => openLink(e.currentTarget.href)}
            >
              Free Currency Rates API
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
