export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// Small debounce for "instant" feel without spamming the API
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 250) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export async function fetchQuote({
  mode,
  to,
  sendAmount,
  cadAmount,
}: {
  mode: "SEND" | "PAY";
  to: string;
  sendAmount?: number;
  cadAmount?: number;
}) {
  const res = await fetch(`${API_BASE}/api/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, to, sendAmount, cadAmount }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Quote failed");
  }

  return res.json();
}
