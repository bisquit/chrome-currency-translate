import { useCurrencyTranslate } from './App.hook';
import { openLink } from './utils/chrome/open-link';

function App() {
  const { fromMoney, toCurrency, toAmount, rate } = useCurrencyTranslate();

  return (
    <>
      <div className="min-w-[300px] p-4">
        {fromMoney ? (
          <>
            <p className="mb-2">
              Translate from {fromMoney.currency.code} to {toCurrency.code}
            </p>
            <div className="px-2 text-center">
              <p className="whitespace-nowrap text-3xl font-bold">
                {fromMoney.amount}&nbsp;{fromMoney.currency.code} = {toAmount}
                &nbsp;{toCurrency.code}
              </p>
            </div>
            <div className="grid place-items-end mt-2 pt-2 border-t border-gray text-xs text-gray">
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

export default App;
