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
    <div class name="graphic-content" style={{ width: "40%", height: 300 }} >
        <h3>Risco de atraso</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="tasks" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BeLateChart;