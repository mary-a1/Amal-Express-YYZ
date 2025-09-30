"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { debounce, fetchQuote } from "@/lib/api";

type Mode = "SEND" | "PAY";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("SEND");
  const [currency, setCurrency] = useState("USD");

  // Editable fields (one is active depending on mode)
  const [recipientAmount, setRecipientAmount] = useState<number | "">(""); // in selected currency
  const [cadAmount, setCadAmount] = useState<number | "">("");             // in CAD

  // Result from backend
  const [rate, setRate] = useState<number | null>(null);
  const [commissionPct, setCommissionPct] = useState<number | null>(null);
  const [commission, setCommission] = useState<number | null>(null);
  const [resultRecipient, setResultRecipient] = useState<number | null>(null);
  const [resultCad, setResultCad] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Debounced quote caller
  const runQuote = useCallback(
    debounce(async (payload: { mode: Mode; to: string; sendAmount?: number; cadAmount?: number }) => {
      try {
        setLoading(true);
        const data = await fetchQuote(payload);
        setRate(data.rate);
        setCommissionPct(data.commissionPct);
        setCommission(data.commission);
        setResultRecipient(Number(data.sendAmount)); // amount recipient gets (in selected currency)
        setResultCad(Number(data.cadAmount));        // amount to e-transfer
        setErr(null);
      } catch (e: any) {
        setErr(e.message || "Quote failed");
        setRate(null);
        setCommissionPct(null);
        setCommission(null);
        setResultRecipient(null);
        setResultCad(null);
      } finally {
        setLoading(false);
      }
    }, 250),
    []
  );

  // Fire quotes on user input
  useEffect(() => {
    if (!currency) return;

    if (mode === "SEND" && typeof recipientAmount === "number" && recipientAmount > 0) {
      runQuote({ mode: "SEND", to: currency, sendAmount: recipientAmount });
    } else if (mode === "PAY" && typeof cadAmount === "number" && cadAmount > 0) {
      runQuote({ mode: "PAY", to: currency, cadAmount });
    } else {
      // Clear results if inputs empty
      setRate(null);
      setCommissionPct(null);
      setCommission(null);
      setResultRecipient(null);
      setResultCad(null);
      setErr(null);
    }
  }, [mode, currency, recipientAmount, cadAmount, runQuote]);

  // Swap direction ⇄
  function swap() {
    if (mode === "SEND") {
      // move recipientAmount -> resultRecipient (stays), allow CAD edit
      setMode("PAY");
      // seed PAY input with last calculated CAD if available
      if (resultCad != null) setCadAmount(Number(resultCad.toFixed(2)));
      setRecipientAmount("");
    } else {
      setMode("SEND");
      if (resultRecipient != null) setRecipientAmount(Number(resultRecipient.toFixed(2)));
      setCadAmount("");
    }
  }

  // Pretty helpers
  const pctLabel = useMemo(
    () => (commissionPct != null ? `${(commissionPct * 100).toFixed(0)}%` : "—"),
    [commissionPct]
  );

  const canSubmit =
    mode === "SEND"
      ? typeof recipientAmount === "number" && recipientAmount > 0
      : typeof cadAmount === "number" && cadAmount > 0;

  return (
    <div className="max-w-2xl mx-auto w-full rounded-2xl bg-white text-black shadow p-6 sm:p-8">
      {/* Card */}
      <div className="rounded-2xl bg-white shadow p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-4">Currency Calculator</h2>

        {/* Currency selection */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Recipient Country / Currency</label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        {/* Bi-directional fields */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-3">
          {/* You pay (CAD) */}
          <div>
            <label className="block text-sm mb-1">You pay (CAD)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              className={`w-full rounded border px-3 py-2 ${mode === "SEND" ? "bg-gray-100 cursor-not-allowed" : ""}`}
              value={cadAmount}
              onChange={(e) => setCadAmount(e.target.value === "" ? "" : Number(e.target.value))}
              disabled={mode === "SEND"}
              min={0}
            />
          </div>

          {/* Swap button */}
          <div className="flex justify-center md:pb-0 pb-1">
            <button
              type="button"
              onClick={swap}
              className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-gray-50"
              title="Swap direction"
              aria-label="Swap direction"
            >
              ⇄
            </button>
          </div>

          {/* Recipient receives (selected currency) */}
          <div>
            <label className="block text-sm mb-1">Recipient receives ({currency})</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              className={`w-full rounded border px-3 py-2 ${mode === "PAY" ? "bg-gray-100 cursor-not-allowed" : ""}`}
              value={recipientAmount}
              onChange={(e) => setRecipientAmount(e.target.value === "" ? "" : Number(e.target.value))}
              disabled={mode === "PAY"}
              min={0}
            />
          </div>
        </div>

        {/* CTA (optional; instant calc happens on type) */}
        <button
          disabled={!canSubmit || !currency || loading}
          onClick={() => {
            if (mode === "SEND" && typeof recipientAmount === "number")
              runQuote({ mode: "SEND", to: currency, sendAmount: recipientAmount });
            if (mode === "PAY" && typeof cadAmount === "number")
              runQuote({ mode: "PAY", to: currency, cadAmount });
          }}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Calculating…" : "Update Quote"}
        </button>

        {/* Error */}
        {err && <p className="text-red-600 text-sm mt-3">{err}</p>}

        {/* Results */}
        {(resultCad != null || resultRecipient != null) && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Summary</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-gray-500">Exchange Rate:</span>{" "}
                  {rate != null ? `1 CAD = ${rate.toFixed(4)} ${currency}` : "—"}
                </p>
                <p>
                  <span className="text-gray-500">Commission:</span>{" "}
                  {pctLabel} {commission != null ? `(${commission.toFixed(2)} ${currency})` : ""}
                </p>
                {mode === "SEND" ? (
                  <>
                    <p>
                      <span className="text-gray-500">You send:</span>{" "}
                      {resultRecipient?.toFixed(2)} {currency}
                    </p>
                    <p className="font-semibold">
                      You pay (CAD): {resultCad?.toFixed(2)} CAD
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="text-gray-500">You pay:</span>{" "}
                      {resultCad?.toFixed(2)} CAD
                    </p>
                    <p className="font-semibold">
                      Recipient receives: {resultRecipient?.toFixed(2)} {currency}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Instructions block */}
            <div className="rounded-lg border p-4 bg-gray-50">
              <h3 className="font-semibold mb-2">To complete your transfer:</h3>
              <ol className="list-decimal list-inside text-sm space-y-2">
                <li>
                  E-transfer the total amount{" "}
                  <strong>
                    ({resultCad != null ? `${resultCad.toFixed(2)} CAD` : "—"})
                  </strong>{" "}
                  to <strong>remit@amaltransfers.ca</strong>.
                </li>
                <li>Include your recipient’s name in the e-transfer message.</li>
                <li>Once received, we’ll process and confirm your transfer.</li>
              </ol>
              <p className="text-sm mt-3">
                <span className="text-gray-500">For support, call</span>{" "}
                <strong>416-245-0805</strong>.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                We’ll collect your sender details automatically when your transfer is received.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
