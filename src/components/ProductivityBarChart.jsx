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
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#22d3ee"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TasksBarChart;


