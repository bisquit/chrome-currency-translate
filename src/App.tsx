import { useCurrencyTranslate } from './App.hook';
import { CurrencyCode, getAllCurrencyCodes } from './core/currencies';
import { Rate } from './core/types';
import { Config, setConfig } from './utils/chrome/config';
import { openLink } from './utils/chrome/open-link';

type AppProps = {
  config: Config;
};

export default function App({ config }: AppProps) {
  const {
    rows,
    toCurrency,
    translating,
    invalidSelection,
    changeToCurrencyCode,
  } = useCurrencyTranslate({
    defaultToCurrencyCode: config.toCurrencyCode,
  });

  const allCurrencyCodes = getAllCurrencyCodes();

  // dedupe rate
  const rates = rows.reduce<Rate[]>((acc, row) => {
    if (acc.some((v) => v.from === row.rate.from)) {
      return acc;
    }
    return [...acc, row.rate];
  }, []);

  const handleToCurrencyCodeChange = (code: CurrencyCode) => {
    changeToCurrencyCode(code);
    setConfig({ toCurrencyCode: code });
  };

  return (
    <>
      <div className="min-w-[360px] p-4">
        {!invalidSelection ? (
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
            <div className="flex flex-col gap-1 px-2 text-center">
              {translating ? (
                <div className="grid h-[32px] place-content-center">
                  <span className="loading-ring loading-md loading"></span>
                </div>
              ) : (
                <>
                  {rows.map((row) => (
                    <p className="text-2xl tracking-wide">
                      <span className="font-bold text-primary">
                        {row.fromMoney.amount.toLocaleString()}&nbsp;
                        {row.fromMoney.currency.code}
                      </span>
                      <span>&nbsp;&nbsp;=&nbsp;&nbsp;</span>
                      <span className="font-bold text-primary">
                        {row.toAmount.toLocaleString()}&nbsp;{toCurrency.code}
                      </span>
                    </p>
                  ))}
                </>
              )}
            </div>
            <div className="mb-2 mt-3 border-t border-base-content border-opacity-80 opacity-80"></div>
            <div className="grid place-items-end text-xs text-base-content text-opacity-80">
              {rates.map((rate) => (
                <p>
                  1&nbsp;{rate.from} = {rate.value.toLocaleString()}&nbsp;
                  {toCurrency.code} ({rate.date})
                </p>
              ))}
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
          <div>
            <h2 className="mb-2 text-lg">
              Chrome Currency Translate Extension
            </h2>
            <div className="mb-2">
              <h3 className="mb-2 text-sm">1. Select text</h3>
              <img src="/usage01.png" alt="" width="174" height="111" />
            </div>
            <div className="mb-2">
              <h3 className="mb-2 text-sm">2. Click extension icon</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
