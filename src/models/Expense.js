import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be positive"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"],
  },
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
