// src/rates.ts

import axios from 'axios';

/**
 * Get the exchange rate for converting USD to CAD
 * The API returns CAD→USD rate, so we need to invert it
 */
export async function getExchangeRate(toCurrency: string): Promise<number> {
  if (toCurrency !== 'USD') {
    throw new Error("Only USD is supported");
  }

  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/CAD`;

  try {
    const res = await axios.get(url);
    const cadToUsdRate = res.data?.conversion_rates?.[toCurrency];

    if (!cadToUsdRate) throw new Error("USD rate not found");
    
    // API gives us CAD→USD (e.g., 0.7141)
    // We need USD→CAD, so we invert it
    const usdToCadRate = 1 / cadToUsdRate;
    
    console.log(`📊 Exchange Rate: 1 USD = ${usdToCadRate.toFixed(4)} CAD (API: 1 CAD = ${cadToUsdRate.toFixed(4)} USD)`);
    
    // Return USD→CAD rate (e.g., 1.4003)
    return usdToCadRate;
  } catch (err) {
    console.error("Exchange rate fetch failed:", err);
    throw err;
  }
}