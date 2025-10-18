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
  const [sendAmount, setSendAmount] = useState<string>("");
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
    }
  }, [sendAmount, receiveAmount, isReversed]);

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl w-full">
      <div className="bg-white text-black rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Currency Calculator</h2>

        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">You send (CAD)</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded"
              placeholder="0.00"
              value={sendAmount}
              onChange={(e) => {
                setSendAmount(e.target.value);
                setIsReversed(false);
              }}
            />
          </div>

          {/* <div className="flex justify-center mb-2">
            <button
              onClick={() => {
                setSendAmount("");
                setReceiveAmount("");
                setQuote(null);
                setIsReversed((prev) => !prev);
              }}
              className="text-xl border px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              ⇄
            </button>
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1">Recipient gets (USD)</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded"
              placeholder="0.00"
              value={receiveAmount}
              onChange={(e) => {
                setReceiveAmount(e.target.value);
                setIsReversed(true);
              }}
            />
          </div>
        </div>

        {quote && (
          <div className="bg-gray-100 rounded-lg p-4 text-sm mt-4 space-y-1">
            <p>
              Exchange Rate: <strong>1 CAD = {quote.rate.toFixed(4)} USD</strong>
            </p>
            <p>
              Commission: <strong>{(quote.commissionPct * 100).toFixed(1)}%</strong> (
              {quote.commission.toFixed(2)} CAD)
            </p>
            <p>
              Total You Pay: {" "}
              <strong>
                {(quote.totalToPay ?? quote.totalToSend ?? 0).toFixed(2)} CAD
              </strong>
            </p>
            <p>
              Recipient Gets: {" "}
              <strong>
                {(quote.recipientAmount ?? quote.sendAmount ?? 0).toFixed(2)} USD
              </strong>
            </p>
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};
