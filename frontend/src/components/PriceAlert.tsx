import { useState } from "react";
import "./priceAlert.css";

type Props = {
  selectedTicker: string;
};

const PriceAlert = ({ selectedTicker }: Props) => {
  const [price, setPrice] = useState<string>("");

  const handleSetAlert = async (): Promise<void> => {
    if (!price) {
      alert("Please enter a price");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: selectedTicker,
          targetPrice: Number(price),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed request");
      }

      const data = await res.json();
      console.log(data);

      alert("Alert set successfully!");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Failed to set alert");
    }
  };

  return (
    <div className="alert-container">
      <h3>Set Price Alert</h3>

      <div className="alert-box">
        <span className="ticker">{selectedTicker}</span>

        <input
          type="number"
          placeholder="Enter target price"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />

        <button onClick={handleSetAlert}>
          Set Alert
        </button>
      </div>
    </div>
  );
};

export default PriceAlert;