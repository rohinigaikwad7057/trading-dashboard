import "./TickerSelector.css";

type Props = {
  selected: string;
  onChange: (value: string) => void;
  options: string[];
};

const TickerSelector = ({ selected, onChange, options }: Props) => {
  return (
    <div className="dropdown">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((ticker) => (
          <option key={ticker} value={ticker}>
            {ticker}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TickerSelector;