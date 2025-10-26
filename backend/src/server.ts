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

app.get("/", (req, res) => {
  res.send("Amal Express backend is live 🚀");
});

app.post('/api/quote', async (req, res) => {
  const { mode, amount, currency } = req.body;

  console.log("🔁 Received /api/quote request:", req.body);

  // Validate input
  if (
    typeof amount !== "number" ||
    amount <= 0 ||
    currency !== "USD" || // Only support USD in this scope
    (mode !== "SEND" && mode !== "PAY")
  ) {
    console.warn("❌ Invalid input:", req.body);
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Get USD → CAD rate (rates.ts already inverts the API rate)
    const usdToCadRate = await getExchangeRate("USD");

    // Compute quote based on mode
    // SEND mode: user enters USD amount they want to send
    // PAY mode: user enters CAD amount they want to pay
    const quote = mode === "SEND"
      ? forwardQuote(amount, usdToCadRate)
      : reverseQuote(amount, usdToCadRate);

    console.log("✅ Quote generated:", quote);

    res.json({
      ...quote,
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