import "./TickerSelector.css";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const TickerSelector = ({ selected, onChange }: Props) => {
  return (
    <div className="dropdown">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="AAPL">AAPL</option>
        <option value="TSLA">TSLA</option>
        <option value="BTC-USD">BTC-USD</option>
      </select>
    </div>
  );
};

export default TickerSelector;