import "./PriceList.css";

type Props = {
  prices: Record<string, string>;
};

const PriceList = ({ prices }: Props) => {
  const entries = Object.entries(prices);

  return (
    <div className="card">
      <h3 className="section-title">Live Prices</h3>
      {entries.length === 0 ? (
        <p className="no-data">Waiting for ticker prices...</p>
      ) : (
        <ul className="price-list">
          {entries.map(([symbol, price]) => {
            const num = Number(price);
            const isNumber = !Number.isNaN(num);
            return (
              <li key={symbol} className="price-item">
                <span>{symbol}</span>
                <span className={isNumber && num > 500 ? "price-green" : "price-red"}>
                  {price}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PriceList;