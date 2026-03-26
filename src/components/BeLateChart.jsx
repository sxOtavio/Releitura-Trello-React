import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
{//lembrar de mudar o style pra nao deixar nesse dcumento
  }
function BeLateChart({ data }) {
  return (
    <div className="graphic-content" style={{ width: "40%", height: 300 }} >
        <h3>Risco de atraso</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="tasks" />
                    
                    <Line
            type="monotone"
            dataKey="tasks"
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

export default BeLateChart;