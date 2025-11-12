import { useState } from "react";
import API from "../services/api";

export default function AddExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/api/expenses", {
        amount,
        category,
        description,
        date,
      });

      onAdd(data); // send new expense to parent
      setAmount("");
      setCategory("Food");
      setDescription("");
      setDate("");
    } catch (err) {
      console.log("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow p-6 rounded-xl border mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1">Amount</label>
          <input 
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      <div className="mt-4">
        <label className="block mb-1">Description</label>
        <input 
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Optional description"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1">Date</label>
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button 
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
