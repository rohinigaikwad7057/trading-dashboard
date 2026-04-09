import { useEffect, useRef, useState } from "react";
import { connectSocket } from "./services/websocket";
import type { PriceData } from "./services/websocket";
import TickerSelector from "./components/TickerSelector";
import PriceList from "./components/PriceList";
import ChartView from "./components/ChartView";
import { fetchHistory, fetchTickers } from "./services/api";


type ChartData = {
  time: string;
  price: number;
  symbol: string;
};

function App() {
  // prices for list
  const [prices, setPrices] = useState<Record<string, string>>({});
  // chart data
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // selected ticker
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  // dynamic tickers from API
  const [tickers, setTickers] = useState<string[]>([]);
  const selectedSymbolRef = useRef<string>(selectedSymbol);

  useEffect(() => {
    selectedSymbolRef.current = selectedSymbol;
  }, [selectedSymbol]);

  // ---------------- FETCH TICKERS ----------------
  useEffect(() => {
    fetchTickers().then((data) => {
      setTickers(data);

      // set default ticker
      if (data.length > 0) {
        setSelectedSymbol(data[0]);
      }

      const initialPrices: Record<string, string> = {};
      data.forEach((ticker) => {
        initialPrices[ticker] = "Loading...";
      });
      setPrices(initialPrices);
    });
  }, []);

  // ---------------- FETCH HISTORY ----------------
  useEffect(() => {
    if (!selectedSymbol) {
      return;
    }

    fetchHistory(selectedSymbol).then((data) => {
      setChartData(data);
    });
  }, [selectedSymbol]);

  // ---------------- WEBSOCKET ----------------
  useEffect(() => {
    const socket = connectSocket((data: PriceData) => {
      // update price list
      setPrices((prev) => ({
        ...prev,
        [data.symbol]: data.price,
      }));

      if (data.symbol !== selectedSymbolRef.current) {
        return;
      }
      setChartData((prev) => [
        ...prev.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          price: Number(data.price),
          symbol: data.symbol,
        },
      ]);
    });

    return () => socket.close();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Trading Dashboard</h1>

      <TickerSelector
        selected={selectedSymbol}
        onChange={setSelectedSymbol}
        options={tickers}
      />

      <div className="dashboard-grid">
        <PriceList prices={prices} />
        <ChartView data={chartData} symbol={selectedSymbol} />
      </div>
    </div>
  );
}

export default App;