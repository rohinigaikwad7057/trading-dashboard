import "./ChartView.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  time: string;
  price: number;
  symbol: string;
};

type Props = {
  data: ChartData[];
  symbol: string;
  loading?: boolean;
};

const ChartView = ({ data, symbol, loading = false }: Props) => {
  return (
    <div className="card chart-card">
      <h3 className="chart-title">{symbol} Price Chart</h3>

      {loading ? (
        <p className="no-data">Loading chart data...</p>
      ) : data.length === 0 ? (
        <p className="no-data">
          {symbol ? "No chart data yet. Try selecting another ticker." : "Select a ticker to load the chart."}
        </p>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartView;