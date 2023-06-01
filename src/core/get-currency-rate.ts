import { CurrencyCode } from './currencies';
import { Rate } from './types';

type GetCurrencyRateApiResponse = {
  [code: string]: number;
} & {
  date: string;
};

export async function getCurrencyRate(
  from: CurrencyCode,
  to: CurrencyCode
): Promise<Rate> {
  const loweredFrom = from.toLowerCase();
  const loweredTo = to.toLowerCase();

  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${loweredFrom}/${loweredTo}.json`,
    { cache: 'no-cache' }
  );
  const json = (await res.json()) as GetCurrencyRateApiResponse;
  return {
    from,
    to,
    date: json.date,
    value: json[loweredTo],
  };
}
