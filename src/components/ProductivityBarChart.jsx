import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BurndownChart({ data }) {
  return (
    <div className="graphic-content" style={{ width: "40%", height: 300 }}>
      <h3>Burndown de Tarefas</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => `${value} tarefas`} />
          <Line
            type="monotone"
            dataKey="remaining"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BurndownChart;


