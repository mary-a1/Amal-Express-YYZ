import axios from 'axios';

export async function getExchangeRate(toCurrency: string): Promise<number> {
  if (toCurrency !== 'USD') {
    throw new Error("Only USD is supported");
  }

  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/CAD`;

  try {
    const res = await axios.get(url);
    const rate = res.data?.conversion_rates?.[toCurrency];

    if (!rate) throw new Error("USD rate not found");
    return rate;
  } catch (err) {
    console.error("Exchange rate fetch failed:", err);
    throw err;
  }
}
