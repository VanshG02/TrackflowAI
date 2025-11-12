import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import AddExpenseForm from "../components/AddExpenseForm";
import MonthlyChart from "../components/Charts/MonthlyChart";
import CategoryChart from "../components/Charts/CategoryChart";
import AIInsights from "../components/AIInsights";


export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses
  useEffect(() => {
    API.get("/api/expenses")
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
  };
  // ----- Expense Statistics -----
  const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const avgSpend = expenses.length
    ? (totalSpend / expenses.length).toFixed(2)
    : 0;

  const maxSpend = expenses.length
    ? Math.max(...expenses.map(exp => exp.amount))
    : 0;

  const totalTransactions = expenses.length;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Welcome, <span className="text-blue-600">{user?.name}</span>
      </h1>
      <p className="text-gray-600 mt-2">
        Here is your TrackFlow AI expense dashboard.
      </p>

      {/* Summary Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">

      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-gray-500 text-sm">Total Spend</h3>
        <p className="text-2xl font-bold text-blue-600">₹{totalSpend}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-gray-500 text-sm">Average Spend</h3>
        <p className="text-2xl font-bold text-purple-600">₹{avgSpend}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-gray-500 text-sm">Highest Spend</h3>
        <p className="text-2xl font-bold text-red-600">₹{maxSpend}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-gray-500 text-sm">Transactions</h3>
        <p className="text-2xl font-bold text-green-600">{totalTransactions}</p>
      </div>

  </div>


      {/* Add Expense Form */}
      <AddExpenseForm onAdd={handleAddExpense} />

      {/* Expense List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Your Expenses</h2>

        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map(exp => (
              <li 
                key={exp._id} 
                className="border p-4 rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-semibold">{exp.category} — ₹{exp.amount}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(exp.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Charts */}
  <MonthlyChart expenses={expenses} />
  <CategoryChart expenses={expenses} />
  <AIInsights expenses={expenses} />

    </div>
  );
}
