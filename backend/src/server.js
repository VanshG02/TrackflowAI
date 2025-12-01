import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenses.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trackflow-ai-kold.vercel.app/", // keep this for deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight handler for all routes safely
// Preflight handler for all routes safely
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json());

// Connect Mongo
connectDB();

// Health route (IMPORTANT)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


// Test route
app.get("/", (req, res) => {
  res.send("TrackFlowAI Backend Running ✔️");
});

// API routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


