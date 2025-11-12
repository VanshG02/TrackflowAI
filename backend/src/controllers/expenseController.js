import Expense from "../models/Expense.js";

// ✅ Add Expense
export const addExpense = async (req, res) => {
  try {
    const { description, amount, category, date} = req.body;

    const newExpense = await Expense.create({
      userId: req.user.userId,
      amount,
      category,
      description,
      date,
    });
    return res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

// ✅ Get All Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId}).sort({ date: -1 });
    return res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};
