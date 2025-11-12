import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryChart({ expenses }) {

  // Group by category
  const categoryTotals = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += exp.amount;
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ["#6366F1", "#F43F5E", "#10B981", "#F59E0B", "#3B82F6", "#8B5CF6"];

  return (
    <div className="bg-white shadow p-6 rounded-xl border mt-8">
      <h2 className="text-xl font-bold mb-4">Category-wise Spending</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={data} 
            cx="50%" 
            cy="50%" 
            outerRadius={110} 
            fill="#8884d8" 
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
