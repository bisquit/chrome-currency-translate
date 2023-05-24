import { MouseEvent } from 'react';
import { openLink } from './utils/open-link';

function App() {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    openLink(e.currentTarget.href);
  };

  return (
    <>
      <div className="min-w-[300px] p-4">
        <p className="mb-2">Translate USD to JPY</p>
        <div className="px-2 text-center">
          <p className="whitespace-nowrap text-3xl font-bold">
            10 USD = 2000 JPY
          </p>
        </div>
        <div className="grid place-items-end mt-2 pt-2 border-t border-gray text-xs text-gray">
          <p>1 USD = 156 JPY (2023-05-24)</p>
          <p>
            <a
              className="underline"
              href="https://github.com/fawazahmed0/currency-api"
              target="_top"
              onClick={handleLinkClick}
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
