// utils/quote.ts

export const COMMISSION_RATE = 0.06;

/**
 * "I want to send" — given CAD, calculate how much the recipient gets
 */
export function calculateRecipientAmount(cadAmount: number, rate: number) {
  const commission = cadAmount * COMMISSION_RATE;
  const amountToConvert = cadAmount - commission;
  const recipientAmount = amountToConvert * rate;

  return {
    mode: "SEND",
    commission,
    recipientAmount,
    totalToSend: cadAmount,
  };
}

/**
 * "I want them to receive" — given desired recipient amount, calculate total CAD
 */
export function calculateTotalCad(recipientAmount: number, rate: number) {
  const amountToConvert = recipientAmount / rate;
  const commission = amountToConvert * COMMISSION_RATE;
  const totalToPay = amountToConvert + commission;

  return {
    mode: "RECEIVE",
    commission,
    recipientAmount,
    totalToPay,
  };
}

