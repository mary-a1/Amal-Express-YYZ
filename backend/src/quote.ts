// src/quote.ts

import { getCommissionPct } from './commission';

/**
 * Mode: "SEND"
 * User enters USD amount they want recipient to get → calculate how much CAD to pay
 * 
 * Example: User wants to send $100 USD
 * 1. Commission: $100 * 0.06 = $6 USD
 * 2. Total USD needed: $100 + $6 = $106 USD
 * 3. Base rate from API: 1 USD = 1.4003 CAD (inverted from API's CAD→USD)
 * 4. Adjust rate: 1.4003 + 0.0453 = 1.4456 CAD per USD
 * 5. CAD to pay: $106 × 1.4456 = $153.24 CAD
 */
export function forwardQuote(usdAmount: number, usdToCadRate: number) {
  const RATE_ADJUSTMENT = parseFloat(process.env.RATE_ADJUSTMENT || '0.0453');
  
  // Calculate commission on the USD amount
  const commissionPct = getCommissionPct(usdAmount);
  const commissionUSD = usdAmount * commissionPct;
  const totalUSD = usdAmount + commissionUSD;
  
  // usdToCadRate is already USD→CAD (e.g., 1.4003)
  // Adjust it for BMO selling price
  const adjustedRate = usdToCadRate + RATE_ADJUSTMENT;
  
  // Convert total USD to CAD
  const totalCAD = totalUSD * adjustedRate;

  return {
    mode: "SEND",
    commissionPct,
    commissionUSD,
    commissionCAD: commissionUSD * adjustedRate,
    recipientAmountUSD: usdAmount,
    totalUSD,
    totalCAD,
    baseRate: usdToCadRate,
    adjustedRate,
    rateAdjustment: RATE_ADJUSTMENT
  };
}

/**
 * Mode: "PAY" / "RECEIVE"
 * User enters CAD amount they want to pay → calculate how much USD recipient gets
 * 
 * Example: User wants to pay $153.24 CAD
 * 1. Base rate: 1 USD = 1.4003 CAD
 * 2. Adjust rate: 1.4003 + 0.0453 = 1.4456 CAD per USD
 * 3. Convert to USD: $153.24 / 1.4456 = $106 USD
 * 4. Need to iterate to find the right USD amount that accounts for commission
 */
export function reverseQuote(cadAmount: number, usdToCadRate: number) {
  const RATE_ADJUSTMENT = parseFloat(process.env.RATE_ADJUSTMENT || '0.0453');
  const adjustedRate = usdToCadRate + RATE_ADJUSTMENT;
  
  // Initial estimate: convert CAD to USD
  let estimatedUSD = cadAmount / adjustedRate;
  
  // Iteratively adjust for commission tier changes
  for (let i = 0; i < 10; i++) {
    const commissionPct = getCommissionPct(estimatedUSD);
    // CAD amount should give us: USD + commission(USD) * rate
    // cadAmount = (USD + USD * commissionPct) * adjustedRate
    // cadAmount = USD * (1 + commissionPct) * adjustedRate
    // USD = cadAmount / ((1 + commissionPct) * adjustedRate)
    estimatedUSD = cadAmount / ((1 + commissionPct) * adjustedRate);
  }
  
  const commissionPct = getCommissionPct(estimatedUSD);
  const commissionUSD = estimatedUSD * commissionPct;
  const totalUSD = estimatedUSD + commissionUSD;
  const commissionCAD = commissionUSD * adjustedRate;

  return {
    mode: "PAY",
    commissionPct,
    commissionUSD,
    commissionCAD,
    recipientAmountUSD: estimatedUSD,
    totalUSD,
    totalCAD: cadAmount,
    baseRate: usdToCadRate,
    adjustedRate,
    rateAdjustment: RATE_ADJUSTMENT
  };
}