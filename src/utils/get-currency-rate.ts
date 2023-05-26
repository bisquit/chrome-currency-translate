type GetCurrencyRateResponse = {
  date: string;
  value: number;
};

export async function getCurrencyRate(
  from: string,
  to: string
): Promise<GetCurrencyRateResponse> {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
  );
  const json = await res.json();
  return {
    date: json.date,
    value: json[to],
  };
}
