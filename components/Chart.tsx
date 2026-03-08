import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Chart({ data }: { data: any[] }) {
  const grouped = data.reduce((acc: any, exp: any) => {
    acc[exp.category_id] = (acc[exp.category_id] || 0) + exp.amount;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([key, value]) => ({
    name: `Category ${key}`,
    value,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-textMuted bg-surface rounded-xl border border-border p-6 shadow-lg min-h-[300px]">
        No data available to display chart.
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-border w-full h-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
