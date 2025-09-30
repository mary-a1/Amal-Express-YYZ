// quote.ts
import { getCommissionPct } from "./commission";


/**
 * Customer wants to send X (USD/KES/etc) → return total CAD to pay
 */
export function forwardQuote(sendAmount: number, rate: number) {
  const commissionPct = getCommissionPct(sendAmount);
  const commission = sendAmount * commissionPct;
  const totalAmount = sendAmount + commission;
  const cadAmount = totalAmount * rate;

  return {
    direction: "SEND",
    commissionPct,
    commission,
    sendAmount,
    totalAmount,
    cadAmount
  };
}

/**
 * Customer has X CAD to pay → return how much recipient can receive
 */
export function reverseQuote(cadAmount: number, rate: number) {
  // Initial estimate — assume no commission
  let estimatedSendAmount = cadAmount / rate;
  let lastSendAmount = 0;

  // Fixed point iteration to converge on correct tier + amount
  for (let i = 0; i < 10; i++) {
    const commissionPct = getCommissionPct(estimatedSendAmount);
    const totalUsd = estimatedSendAmount * (1 + commissionPct);
    const estimatedCad = totalUsd * rate;

    if (Math.abs(estimatedCad - cadAmount) < 0.01) {
      break;
    }

    lastSendAmount = estimatedSendAmount;
    estimatedSendAmount = cadAmount / (rate * (1 + commissionPct));
  }

  const commissionPct = getCommissionPct(estimatedSendAmount);
  const commission = estimatedSendAmount * commissionPct;
  const totalAmount = estimatedSendAmount + commission;

  return {
    direction: "PAY",
    commissionPct,
    commission,
    sendAmount: estimatedSendAmount,
    totalAmount,
    cadAmount
  };
}