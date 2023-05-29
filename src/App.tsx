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
      <div className="min-w-[360px] p-4">
        {fromMoney ? (
          <>
            <div className="mb-2 flex">
              <div className="flex items-center gap-2">
                <span>Translate to</span>
                <select
                  className="select-bordered select select-xs"
                  defaultValue={config.toCurrencyCode}
                  onChange={(e) =>
                    handleToCurrencyCodeChange(e.target.value as CurrencyCode)
                  }
                >
                  {allCurrencyCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-2 text-center">
              <p className="whitespace-nowrap text-2xl tracking-wide">
                <span className="font-bold text-primary">
                  {fromMoney.amount.toLocaleString()}&nbsp;
                  {fromMoney.currency.code}
                </span>
                <span>&nbsp;&nbsp;=&nbsp;&nbsp;</span>
                {toAmount && (
                  <span className="font-bold text-primary">
                    {toAmount.toLocaleString()}&nbsp;{toCurrency.code}
                  </span>
                )}
              </p>
            </div>
            <div className="mb-2 mt-3 border-t border-base-content border-opacity-80 opacity-80"></div>
            <div className="grid place-items-end text-xs text-base-content text-opacity-80">
              {rate && (
                <p>
                  1&nbsp;{fromMoney.currency.code} ={' '}
                  {rate.value.toLocaleString()}&nbsp;
                  {toCurrency.code} ({rate.date})
                </p>
              )}
              <p>
                <a
                  className="link"
                  href="https://github.com/fawazahmed0/currency-api"
                  target="_top"
                  onClick={(e) => openLink(e.currentTarget.href)}
                >
                  Rates API
                </a>
              </p>
            </div>
          </>
        ) : (
          <div className="prose">
            <h4>Currency Translate</h4>
            <h5>1. Select text</h5>
            <h5>2. Click extension icon</h5>
          </div>
        )}
      </div>
    </>
  );
}
