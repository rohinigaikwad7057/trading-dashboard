import "./PriceList.css";

type Props = {
  prices: Record<string, string>;
};

const PriceList = ({ prices }: Props) => {
  return (
    <div className="card">
      <h3 className="section-title">Live Prices</h3>
      <ul className="price-list">
        {Object.entries(prices).map(([symbol, price]) => {
          const num = Number(price);
          return (
            <li key={symbol} className="price-item">
              <span>{symbol}</span>
              <span className={num > 500 ? "price-green" : "price-red"}>
                {price}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PriceList;