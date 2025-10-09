// quote.ts
// import { getCommissionPct } from "./commission";

/**
 * Customer wants to send X (USD/KES/etc) → return total CAD to pay
 */
// export function forwardQuote(sendAmount: number, rate: number) {
//   const commissionPct = getCommissionPct(sendAmount); // CAD
//   const commission = sendAmount * commissionPct; // CAD
//   const total = sendAmount + commission; // CAD

//   const foreignAmount = total / rate; // ✅ Convert CAD → USD, KES, etc

//   return {
//     direction: "SEND",
//     commissionPct,
//     commission,
//     totalAmount: total,
//     sendAmount,
//     convertedAmount: foreignAmount,
//   };
// }

/**
 * Customer has X CAD to pay → return how much recipient can receive
 */

// export function reverseQuote(cadAmount: number, rate: number) {
//   // Invert the rate: from CAD→USD → USD→CAD
//   const invertedRate = 1 / rate;

//   let estimatedSendAmount = cadAmount * invertedRate;

//   for (let i = 0; i < 10; i++) {
//     const commissionPct = getCommissionPct(estimatedSendAmount);
//     estimatedSendAmount = (cadAmount * invertedRate) / (1 + commissionPct);
//   }

//   const commissionPct = getCommissionPct(estimatedSendAmount);
//   const commission = estimatedSendAmount * commissionPct;
//   const totalAmount = estimatedSendAmount + commission;

//   return {
//     direction: "PAY",
//     commissionPct,
//     commission,
//     sendAmount: estimatedSendAmount,
//     totalAmount,
//     cadAmount,
//   };
// }

// src/quote.ts

import { getCommissionPct } from './commission';

/**
 * Mode: "SEND"
 * User enters CAD → calculate how much recipient gets in foreign currency
 */
export function forwardQuote(cadAmount: number, rate: number) {
  const commissionPct = getCommissionPct(cadAmount);
  const commission = cadAmount * commissionPct;
  const amountToConvert = cadAmount - commission;
  const recipientAmount = amountToConvert * rate;

  return {
    mode: "SEND",
    commissionPct,
    commission,
    recipientAmount,
    totalToSend: cadAmount
  };
}

/**
 * Mode: "RECEIVE"
 * User enters amount recipient should get → calculate how much CAD to pay
 */
export function reverseQuote(recipientAmount: number, rate: number) {
  let amountToConvert = recipientAmount / rate;

  // Estimate CAD → adjust for commission tier
  for (let i = 0; i < 10; i++) {
    const commissionPct = getCommissionPct(amountToConvert);
    amountToConvert = recipientAmount / (rate * (1 - commissionPct));
  }

  const commissionPct = getCommissionPct(amountToConvert);
  const commission = amountToConvert * commissionPct;
  const totalToPay = amountToConvert + commission;

  return {
    mode: "RECEIVE",
    commissionPct,
    commission,
    totalToPay,
    recipientAmount
  };
}
