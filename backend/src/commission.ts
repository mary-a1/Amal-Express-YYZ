export function getCommissionPct(amount: number): number {
  if (amount >= 10000) return 0.02;
  if (amount >= 3000) return 0.03;
  if (amount >= 2000) return 0.04;
  if (amount >= 1000) return 0.05;
  return 0.06;
}
