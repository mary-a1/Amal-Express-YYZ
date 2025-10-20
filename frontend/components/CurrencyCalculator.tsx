"use client";

import React, { useState, useEffect } from "react";

interface QuoteResponse {
  mode: "SEND" | "PAY";
  commissionPct: number;
  commission: number;
  recipientAmount?: number;
  totalToSend?: number;
  totalToPay?: number;
  sendAmount?: number;
  rate: number;
  currency: string;
}

interface CurrencyCalculatorProps {
  setFinalPayAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function CurrencyCalculator({ setFinalPayAmount }: CurrencyCalculatorProps) {
  const [sendAmount, setSendAmount] = useState<string>("150.52");;
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [isReversed, setIsReversed] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5001/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(isReversed ? receiveAmount : sendAmount),
          currency: "USD",
          mode: isReversed ? "PAY" : "SEND",
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      setQuote(data);
      if (isReversed) {
        if (data.totalToPay !== undefined) {
          setSendAmount(data.totalToPay.toFixed(2));
          setFinalPayAmount(data.totalToPay);
        } else {
          setSendAmount("0");
          setFinalPayAmount(0);
        }
      } else {
        if (data.totalToSend !== undefined) {
          setReceiveAmount(data.recipientAmount?.toFixed(2) || "0");
          setFinalPayAmount(data.totalToSend);
        } else {
          setReceiveAmount("0");
          setFinalPayAmount(0);
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      (!isReversed && sendAmount && !isNaN(Number(sendAmount))) ||
      (isReversed && receiveAmount && !isNaN(Number(receiveAmount)))
    ) {
      handleQuote();
    } {
      const timer = setTimeout(() => handleQuote(), 500);
      return () => clearTimeout(timer);
    }
  }, [sendAmount, receiveAmount, isReversed]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto">
      {/* You send section */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">You send</h3>
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
          <input
            type="number"
            className="text-3xl sm:text-4xl font-semibold outline-none flex-1 bg-transparent min-w-0 text-black"
            placeholder="150.52"
            value={sendAmount}
            onChange={(e) => {
              setSendAmount(e.target.value);
              setIsReversed(false);
            }}
          />
          <div className="flex items-center gap-2 ml-4">
            <span className="text-4xl">🇨🇦</span>
            <span className="font-semibold  text-black text-sm sm:text-base">CAD</span>
          </div>
        </div>
      </div>

      {/* Exchange rate & Comission*/}
      {quote && (
        <div className="my-8 space-y-4">
          <div>
            <p className="text-orange-500 font-semibold text-sm mb-1">Exchange rate</p>
            <p className="text-base sm:text-lg font-bold text-black mb-1">
              1 CAD = {quote.rate.toFixed(2)} USD
            </p>
            <p className="text-xs text-gray-400 italic mt-1">
              *Based on Amal Bank Sending rate! 😊
            </p>
          </div>

          <div className="border-l-4 border-black pl-4 py-3 space-y-2.5 text-black">
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-sm text-gray-700">Commission ({(quote.commissionPct * 100).toFixed(0)}%)</span>
              <span className="font-semibold text-base text-black">
                ${(quote.commission || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm sm:text-base">Total Cost</span>
              <span className="font-bold text-lg sm:text-xl">
                ${(quote.totalToPay ?? quote.totalToSend ?? 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* They receive section */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">They Receive</h3>
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
          <input
            type="number"
            className="text-3xl sm:text-4xl font-semibold outline-none flex-1 bg-transparent min-w-0 text-black"
            placeholder="100.00"
            value={receiveAmount}
            onChange={(e) => {
              setReceiveAmount(e.target.value);
              setIsReversed(true);
            }}
          />
          <div className="flex items-center gap-2 ml-4">
            <span className="text-4xl">🇺🇸</span>
            <span className="font-semibold text-black text-sm sm:text-base">USD</span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
};
