import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.EXCHANGE_RATE_API_KEY;
if (!apiKey) throw new Error("Missing EXCHANGE_RATE_API_KEY in .env");

// Define the API response shape
interface ExchangeRateResponse {
  base_code: string;
  conversion_rates: {
    [currency: string]: number;
  };
}

// Get the CAD to `to` conversion rate with adjustment applied
export async function getRate(to: string): Promise<{
  base: string;
  xeRate: number;
  adjustedRate: number;
}> {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/CAD`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`ExchangeRate API error ${res.status}`);

  const data = (await res.json()) as ExchangeRateResponse;

  const rate = data.conversion_rates[to];
  if (!rate) throw new Error(`Currency ${to} not found in conversion_rates`);

  const adjustedRate = rate + Number(process.env.RATE_ADJUSTMENT ?? 0);

  return {
    base: data.base_code,
    xeRate: rate,
    adjustedRate,
  };
}
