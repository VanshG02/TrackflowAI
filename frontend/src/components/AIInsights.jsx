import { useState } from "react";
import API from "../services/api";

export default function AIInsights({expenses}) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState("");

  const generateInsights = async () => {
    if (!expenses.length) return alert("Please add some expenses first!");

    try {
      setLoading(true);
      const { data } = await API.post("/api/ai",{expenses});
      setInsights(data.insights);
    } catch (err) {
      console.error("Error generating insights:", err);
      alert("Failed to generate insights. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl border mt-8">
      <h2 className="text-xl font-bold mb-4">AI Spending Insights</h2>

      <button
        onClick={generateInsights}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Generate Insights"}
      </button>

      {insights && (
        <p className="mt-4 whitespace-pre-line text-gray-700">
          {insights}
        </p>
      )}
    </div>
  );
}
