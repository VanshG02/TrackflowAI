// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { ArrowRight, LineChart, Brain, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center text-center px-6 py-20">
      
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Smarter Expense Tracking with <span className="text-blue-600">AI Insights</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          TrackFlow AI helps you manage your spending intelligently — 
          track expenses, visualize trends, and get personalized AI-driven insights to 
          improve your financial habits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </Link>
          <Link
            to="/register"
            className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
          <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
            <Wallet size={28} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Expense Management</h3>
          <p className="text-gray-600">
            Log your daily transactions, categorize spending, and stay organized effortlessly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
          <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
            <LineChart size={28} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
          <p className="text-gray-600">
            See how your money moves with clean charts and data visualizations that make sense.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
          <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
            <Brain size={28} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
          <p className="text-gray-600">
            Leverage AI to detect spending patterns, anomalies, and personalized saving tips.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} TrackFlow AI — Built with ❤️ by Vansh Goyal
      </footer>
    </div>
  );
}

