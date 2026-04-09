import { useEffect, useState } from "react";
import { connectSocket } from "./services/websocket";
import type { PriceData } from "./services/websocket";
import TickerSelector from "./components/TickerSelector";
import PriceList from "./components/PriceList";
import ChartView from "./components/ChartView";

type ChartData = {
  time: string;
  price: number;
  symbol: string;
};

function App() {
  // Store latest prices
  const [prices, setPrices] = useState<Record<string, string>>({});
  // Store chart data (NO any)
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // Selected symbol
  const [selectedSymbol, setSelectedSymbol] = useState<string>("TSLA");

  useEffect(() => {
    const socket = connectSocket((data: PriceData) => {
      //Update price list
      setPrices((prev) => ({
        ...prev,
        [data.symbol]: data.price,
      }));
      //Update chart data (last 20 points)
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

  // Filter data for selected symbol
  const filteredData = chartData.filter(
    (item: ChartData) => item.symbol === selectedSymbol
  );

  return (
    <div className="container">
      <h1 className="title">Trading Dashboard</h1>

      <TickerSelector
        selected={selectedSymbol}
        onChange={setSelectedSymbol}
      />

  <div className="dashboard-grid">
      <PriceList prices={prices} />
    <ChartView data={filteredData} symbol={selectedSymbol} />
  </div>
    </div>
  );
}

export default App;