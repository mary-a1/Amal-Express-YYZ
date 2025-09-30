"use client";
import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { fetchQuote } from "@/lib/api";

type Mode = "SEND" | "PAY";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("SEND");
  const [currency, setCurrency] = useState("USD");
  const [sendAmount, setSendAmount] = useState<number | "">("");
  const [cadAmount, setCadAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchQuote({
        mode,
        to: currency,
        sendAmount: mode === "SEND" ? Number(sendAmount) : undefined,
        cadAmount: mode === "PAY" ? Number(cadAmount) : undefined,
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow bg-white space-y-6">
      <h2 className="text-xl font-bold">Currency Calculator</h2>

      <div className="space-y-2">
        <label className="block text-sm">Recipient Currency</label>
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          className={`px-3 py-2 rounded ${
            mode === "SEND" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("SEND")}
        >
          I want to send
        </button>
        <button
          className={`px-3 py-2 rounded ${
            mode === "PAY" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("PAY")}
        >
          I want to pay
        </button>
      </div>

      {mode === "SEND" ? (
        <div>
          <label className="block text-sm mt-4">Amount to Send (in {currency})</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={sendAmount}
            onChange={(e) => setSendAmount(Number(e.target.value))}
            min={1}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm mt-4">Amount to Pay (in CAD)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={cadAmount}
            onChange={(e) => setCadAmount(Number(e.target.value))}
            min={1}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={loading || !currency || (!sendAmount && !cadAmount)}
      >
        {loading ? "Calculating..." : "Get Quote"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {result && (
        <div className="bg-gray-50 rounded p-4 text-sm space-y-1 border">
          <p>
            <strong>Exchange Rate:</strong> 1 CAD = {result.rate.toFixed(4)} {result.currency}
          </p>
          <p>
            <strong>Commission:</strong> {(result.commissionPct * 100).toFixed(0)}% (
            {result.commission.toFixed(2)} {result.currency})
          </p>
          {mode === "SEND" ? (
            <>
              <p>
                <strong>You send:</strong> {result.sendAmount.toFixed(2)} {result.currency}
              </p>
              <p>
                <strong>You pay (CAD):</strong> {result.cadAmount.toFixed(2)} CAD
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>You pay:</strong> {result.cadAmount.toFixed(2)} CAD
              </p>
              <p>
                <strong>Recipient receives:</strong> {result.sendAmount.toFixed(2)} {result.currency}
              </p>
            </>
          )}
          <div className="pt-2 text-xs text-gray-500 border-t mt-2">
            E-transfer to <strong>remit@amaltransfers.ca</strong> and include the recipient name.
          </div>
        </div>
      )}
    </div>
  );
}
