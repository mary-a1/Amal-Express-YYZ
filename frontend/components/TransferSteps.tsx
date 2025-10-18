import React from "react";

interface TransferStepsProps {
  finalPayAmount: number | null;
}

export default function TransferSteps({ finalPayAmount }: TransferStepsProps) {
  return (
    <div className="bg-white text-black rounded-lg shadow-md p-6 w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">To complete your transfer:</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm">
        <li>
          E-transfer the total amount
          {finalPayAmount !== null && (
            <> <strong> ({finalPayAmount.toFixed(2)} CAD)</strong></>
          )}{" "}
          to: 📧 <strong>remit@amaltransfers.ca</strong>
        </li>
        <li>Include your recipient’s name in the e-transfer message.</li>
        <li>
          Once received, we’ll process and confirm your transfer.
        </li>
      </ol>
      <p className="mt-4 text-sm text-gray-600">
        ✨ For support, call <strong className="text-gray-800">416-245-0805</strong>
        <br />
        <span className="text-xs text-gray-400">
          (We’ll collect your personal details automatically when your transfer is received.)
        </span>
      </p>
    </div>
  );
}
