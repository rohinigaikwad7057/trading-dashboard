export const fetchTickers = async (): Promise<string[]> => {
  const res = await fetch("http://localhost:3001/api/tickers");
  return res.json();
};

export const fetchHistory = async (symbol: string) => {
  const res = await fetch(
    `http://localhost:3001/api/history?symbol=${symbol}`
  );
  return res.json();
};