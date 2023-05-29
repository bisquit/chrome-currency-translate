import { useCurrencyTranslate } from './App.hook';
import { CurrencyCode, getAllCurrencyCodes } from './core/currencies';
import { Config, setConfig } from './utils/chrome/config';
import { openLink } from './utils/chrome/open-link';

type AppProps = {
  config: Config;
};

export default function App({ config }: AppProps) {
  const { fromMoney, toCurrency, toAmount, rate, changeToCurrencyCode } =
    useCurrencyTranslate({
      defaultToCurrencyCode: config.toCurrencyCode,
    });

  const allCurrencyCodes = getAllCurrencyCodes();

  const handleToCurrencyCodeChange = (code: CurrencyCode) => {
    changeToCurrencyCode(code);
    setConfig({ toCurrencyCode: code });
  };

  return (
    <>
      <div className="min-w-[360px] bg-[#333c51] p-4 text-[#04b8cc]">
        {fromMoney ? (
          <>
            <div className="mb-2 flex">
              <div className="flex items-center gap-1">
                <span>Translate to:</span>
                <select
                  className="select-ghost select select-xs"
                  defaultValue={config.toCurrencyCode}
                  onChange={(e) =>
                    handleToCurrencyCodeChange(e.target.value as CurrencyCode)
                  }
                >
                  {allCurrencyCodes.map((code) => (
                    <option value={code}>{code}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-2 text-center">
              <p className="whitespace-nowrap text-2xl font-bold">
                {fromMoney.amount}&nbsp;{fromMoney.currency.code} = {toAmount}
                &nbsp;{toCurrency.code}
              </p>
            </div>
            <div className="border-gray text-gray mt-2 grid place-items-end border-t pt-2 text-xs">
              {rate && (
                <p>
                  1&nbsp;{fromMoney.currency.code} = {rate.value}&nbsp;
                  {toCurrency.code} ({rate.date})
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
          </>
        ) : (
          <>
            <h2>How to use</h2>
            <p>1. select money</p>
            <p>2. click icon</p>
          </>
        )}
      </div>
    </>
  );
}
