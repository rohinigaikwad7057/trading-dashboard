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
};

const ChartView = ({ data, symbol }: Props) => {
  return (
    <div className="card chart-card">
      <h3 className="chart-title">{symbol} Price Chart</h3>

      {data.length === 0 ? (
        <p className="no-data">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
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
      )}
    </div>
  );
};

export default ChartView;