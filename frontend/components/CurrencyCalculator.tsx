// frontend/components/CurrencyCalculator.tsx
"use client";

import React, { useState, useEffect } from "react";

interface QuoteResponse {
  mode: "SEND" | "PAY";
  commissionPct: number;
  commissionUSD: number;
  commissionCAD: number;
  recipientAmountUSD: number;
  totalUSD: number;
  totalCAD: number;
  baseRate: number;
  adjustedRate: number;
  rateAdjustment: number;
  currency: string;
}

interface CurrencyCalculatorProps {
  setFinalPayAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function CurrencyCalculator({ setFinalPayAmount }: CurrencyCalculatorProps) {
  // State for input values
  const [usdAmount, setUsdAmount] = useState<string>("100.00");
  const [cadAmount, setCadAmount] = useState<string>("");

  // Track which field was last edited
  const [lastEdited, setLastEdited] = useState<"USD" | "CAD">("USD");

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const mode = lastEdited === "USD" ? "SEND" : "PAY";
      const amount = Number(lastEdited === "USD" ? usdAmount : cadAmount);

      if (isNaN(amount) || amount <= 0) {
        setError("Please enter a valid amount");
        setLoading(false);
        return;
      }

      console.log("📤 Sending request:", { amount, currency: "USD", mode });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "USD",
          mode,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API Error:", errorText);
        throw new Error(`Failed to fetch quote: ${res.status}`);
      }

      const data: QuoteResponse = await res.json();
      console.log("📥 Received response:", data);

      setQuote(data);

      // Update the opposite field based on which mode we're in
      if (lastEdited === "USD") {
        // User entered USD, update CAD
        if (data.totalCAD !== undefined) {
          setCadAmount(data.totalCAD.toFixed(2));
          setFinalPayAmount(data.totalCAD);
        }
      } else {
        // User entered CAD, update USD
        if (data.recipientAmountUSD !== undefined) {
          setUsdAmount(data.recipientAmountUSD.toFixed(2));
        }
        if (data.totalCAD !== undefined) {
          setFinalPayAmount(data.totalCAD);
        }
      }
    } catch (err: any) {
      console.error("❌ Error in handleQuote:", err);
      setError(err.message || "Something went wrong");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  // Debounced quote fetch - separate effects for each field
  useEffect(() => {
    if (lastEdited === "USD" && usdAmount && !isNaN(Number(usdAmount)) && Number(usdAmount) > 0) {
      const timer = setTimeout(() => handleQuote(), 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdAmount, lastEdited]);

  useEffect(() => {
    if (lastEdited === "CAD" && cadAmount && !isNaN(Number(cadAmount)) && Number(cadAmount) > 0) {
      const timer = setTimeout(() => handleQuote(), 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cadAmount, lastEdited]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto">
      {/* Recipient Receives section - USD (TOP) */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          Recipient Receives
        </h3>
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
          <input
            type="number"
            step="1"
            min="0"
            className="text-3xl sm:text-4xl font-semibold outline-none flex-1 bg-transparent min-w-0 text-black"
            placeholder="100.00"
            value={usdAmount}
            onChange={(e) => {
              setUsdAmount(e.target.value);
              setLastEdited("USD");
            }}
          />
          <div className="flex items-center gap-2 ml-4">
            <span className="text-4xl">🇺🇸</span>
            <span className="font-semibold text-black text-sm sm:text-base">USD</span>
          </div>
        </div>
      </div>

      {/* Exchange rate & Commission */}
      {quote && (
        <div className="my-8 space-y-4">
          <div>
            <p className="text-orange-500 font-semibold text-sm mb-1">Exchange Rate</p>
            <p className="text-base sm:text-lg font-bold text-black mb-1">
              1 CAD = {quote.adjustedRate ? (1 / quote.adjustedRate).toFixed(4) : 'N/A'} USD
            </p>
            {/* <p className="text-xs text-gray-400 italic mt-1">
              *Adjusted to match BMO selling rate 😊
            </p> */}
          </div>

          <div className="border-l-4 border-black pl-4 py-3 space-y-2.5 text-black">
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-sm text-gray-700">
                Amount to Send (USD)
              </span>
              <span className="font-semibold text-base text-black">
                ${quote.recipientAmountUSD?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-sm text-gray-700">
                Commission ({((quote.commissionPct || 0) * 100).toFixed(0)}%)
              </span>
              <span className="font-semibold text-base text-black">
                ${quote.commissionUSD?.toFixed(2) || '0.00'} USD
              </span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-sm text-gray-700">
                Total (USD)
              </span>
              <span className="font-semibold text-base text-black">
                ${quote.totalUSD?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="border-t-2 border-gray-200 pt-2 mt-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm sm:text-base text-orange-500">
                You Pay (CAD)
              </span>
              <span className="font-bold text-lg sm:text-xl text-green-600">
                ${quote.totalCAD?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* You Pay section - CAD (BOTTOM) */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          You Pay
        </h3>
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
          <input
            type="number"
            step="1"
            min="0"
            className="text-3xl sm:text-4xl font-semibold outline-none flex-1 bg-transparent min-w-0 text-black"
            placeholder="153.52"
            value={cadAmount}
            onChange={(e) => {
              setCadAmount(e.target.value);
              setLastEdited("CAD");
            }}
          />
          <div className="flex items-center gap-2 ml-4">
            <span className="text-4xl">🇨🇦</span>
            <span className="font-semibold text-black text-sm sm:text-base">CAD</span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      {loading && <p className="text-gray-500 text-sm mt-4">Calculating...</p>}
    </div>
  );
}