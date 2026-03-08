import { useEffect, useState } from "react";
import api from "../utils/api";
import Chart from "../components/Chart";
import ExpenseForm from "../components/ExpendeForm";
import { LogOut, Wallet } from "lucide-react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    const token = localStorage.getItem("token");
    // For development, we handle if no token exists without crashing the app
    if (!token) return;

    api.get("/expenses", { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setExpenses(res.data))
       .catch(err => console.error("Failed to fetch expenses", err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce((acc, exp: any) => acc + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background text-textMain pb-12">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Wallet size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Expense Tracker</h1>
          </div>
          <button className="flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Form & Stats */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Overview Card */}
            <div className="bg-gradient-to-br from-primary to-primaryHover p-6 rounded-2xl shadow-xl shadow-primary/20">
              <h3 className="text-primary-100 text-sm font-medium mb-1 opacity-90">Total Expenses</h3>
              <p className="text-4xl font-bold tracking-tight">${totalExpenses.toFixed(2)}</p>
            </div>

            <ExpenseForm onAdded={fetchExpenses} />
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-2">
            <Chart data={expenses} />
            
            {/* Recent Expenses List Placeholder */}
            <div className="mt-8 bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="font-semibold text-lg">Recent Expenses</h3>
              </div>
              <div className="p-0">
                {expenses.length === 0 ? (
                  <p className="p-6 text-center text-textMuted">No expenses recorded yet.</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {expenses.slice(0, 5).map((exp: any, i) => (
                      <li key={i} className="px-6 py-4 flex justify-between items-center hover:bg-surface/50 transition-colors">
                        <div>
                          <p className="font-medium text-white">{exp.description || 'Unknown'}</p>
                          <p className="text-sm text-textMuted">{new Date(exp.date).toLocaleDateString()} - Category {exp.category_id}</p>
                        </div>
                        <p className="font-semibold text-primary">
                          ${exp.amount.toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
