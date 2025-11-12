import OpenAI from "openai";

export const getAIInsights = async (req, res) => {
  console.log("🧠 /api/ai endpoint hit");

  try {
    console.log("📦 Request body received:", req.body);

    const { expenses } = req.body;

    if (!expenses || !Array.isArray(expenses) || expenses.length === 0) {
      console.log("⚠️ No expenses provided");
      return res.status(400).json({ error: "No expenses provided" });
    }

    console.log("🧠 Checking API key:", process.env.OPENAI_API_KEY ? "✅ Exists" : "❌ Missing");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("🚀 Sending request to OpenAI...");

    const prompt = `
      You are an AI financial assistant.
      Analyze these expenses and summarize key insights:
      ${JSON.stringify(expenses, null, 2)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("✅ Response received from OpenAI");

    const insightText = response.choices?.[0]?.message?.content || "No insights generated.";
    console.log("📊 AI Insights:", insightText);

    return res.json({ insights: insightText });

  } catch (error) {
    console.error("❌ AI Error Details:", error);
    res.status(500).json({
      error: error.message || "AI insights generation failed",
    });
  }
};
