import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRate } from './rates';
import { forwardQuote, reverseQuote } from './quote';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Amal Transfers API is running");
});

app.get("/api/rate", async (req, res) => {
  const to = req.query.to?.toString().toUpperCase();
  if (!to) return res.status(400).json({ error: "Missing 'to' query param" });

  try {
    const { xeRate, adjustedRate } = await getRate(to);
    res.json({ currency: to, xeRate, adjustedRate });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ NOW SUPPORTS BOTH MODES: SEND or PAY
app.post("/api/quote", async (req, res) => {
  const { to, mode, sendAmount, cadAmount } = req.body;

  if (!to || typeof to !== 'string' || !mode) {
    return res.status(400).json({ error: "Missing 'to' or 'mode'" });
  }

  try {
    const { adjustedRate } = await getRate(to.toUpperCase());

    if (mode === 'SEND') {
      if (typeof sendAmount !== 'number') {
        return res.status(400).json({ error: "Missing or invalid 'sendAmount'" });
      }
      const result = forwardQuote(sendAmount, adjustedRate);
      return res.json({ currency: to, rate: adjustedRate, ...result });
    }

    if (mode === 'PAY') {
      if (typeof cadAmount !== 'number') {
        return res.status(400).json({ error: "Missing or invalid 'cadAmount'" });
      }
      const result = reverseQuote(cadAmount, adjustedRate);
      return res.json({ currency: to, rate: adjustedRate, ...result });
    }

    return res.status(400).json({ error: "Invalid mode. Use 'SEND' or 'PAY'" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Amal Transfers backend running on http://localhost:${PORT}`);
});
