import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenses.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";

// ✅ Load environment variables
dotenv.config();


// ✅ Initialize app
const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",        // local frontend
      "https://trackflowai.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("TrackFlowAI Backend Running ✔️");
});

// ✅ API routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


