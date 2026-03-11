import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function TasksBarChart({ data }) {
  return (
    <div className="graphic-content" style={{ width: "40%", height: 300 }}>
      <h3>Produtividade da Equipe</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TasksBarChart;