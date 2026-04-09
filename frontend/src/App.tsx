import { useEffect, useState } from "react";
import { connectSocket } from "./services/websocket";
import type { PriceData } from "./services/websocket";
import TickerSelector from "./components/TickerSelector";
import PriceList from "./components/PriceList";

function App() {
  // Store latest prices
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [selectedSymbol, setSelectedSymbol] = useState<string>("TSLA");

  useEffect(() => {
    const socket = connectSocket((data: PriceData) => {
      setPrices((prev) => ({
        ...prev,
        [data.symbol]: data.price,
      }));
    });

    return () => socket.close();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Trading Dashboard</h1>

      <TickerSelector
        selected={selectedSymbol}
        onChange={setSelectedSymbol}
      />
      <PriceList prices={prices} />
    </div>
  );
}

export default App;