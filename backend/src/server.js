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
const allowedOrigins =  [
      "http://localhost:5173",
      "https://trackflow-ai-kold.vercel.app", // keep this for deployed frontend
    ];


const corsOptions = {
  origin(origin, callback) {
    // allow requests with no origin (like Postman, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true, // let our own middleware send the response
};

app.use(cors(corsOptions));

// Preflight handler for all routes safely
// Preflight handler for all routes safely
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
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


