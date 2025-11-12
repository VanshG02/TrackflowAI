import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function MonthlyChart({ expenses }) {

  // Group by month
  const monthlyData = {};

  expenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("en-IN", { month: "short" });

    if (!monthlyData[month]) monthlyData[month] = 0;

    monthlyData[month] += exp.amount;
  });

  // Convert to chart-friendly format
  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="bg-white shadow p-6 rounded-xl border mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Spending</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
