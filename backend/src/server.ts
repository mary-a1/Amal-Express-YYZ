// src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { forwardQuote, reverseQuote } from './quote';
import { getExchangeRate } from './rates';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/quote', async (req, res) => {
  const { mode, amount, currency } = req.body;

  console.log("🔁 Received /api/quote request:", req.body);

  // Validate input
  if (
    typeof amount !== "number" ||
    currency !== "USD" || // Only support USD in this scope
    (mode !== "SEND" && mode !== "PAY")
  ) {
    console.warn("❌ Invalid input:", req.body);
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Get live CAD -> USD rate
    const rate = await getExchangeRate("USD");

    // Compute quote based on mode
    const quote = mode === "SEND"
      ? forwardQuote(amount, rate)
      : reverseQuote(amount, rate);

    res.json({
      ...quote,
      rate,
      currency: "USD"
    });

  } catch (err: any) {
    console.error("❌ Error generating quote:", err.message);
    res.status(500).json({ error: "Failed to generate quote" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Amal Transfers backend running on http://localhost:${PORT}`);
});