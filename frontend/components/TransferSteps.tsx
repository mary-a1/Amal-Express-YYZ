
import React from "react";

interface TransferStepsProps {
  finalPayAmount: number | null;
}

export default function TransferSteps({ finalPayAmount }: TransferStepsProps) {
  return (
    <>
      {/* 3 Easy Steps Section */}
      <div id="steps" className="bg-transparent text-white py-3 px-4 sm:py-3  sm:px-6 lg:px-8 lg:py-5">
        <div className="max-w-7xl mx-auto text-2xl">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
            <span className="text-yellow-400">Send Money in 3 Easy Steps</span>
          </h2>
          <p className="text-center text-white mb-2 sm:text-xl max-w-3xl mx-auto">
            Sending money with Amal Transfers is simple, transparent, and secure.
          </p>
          <p className="text-center text-white mb-12 sm:text-xl max-w-3xl mx-auto">
            Follow these steps to complete your transfer in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="border-2 border-yellow-400 rounded-xl p-6 sm:p-8 bg-[#0D0C1D]">
              <h3 className="text-xl sm:text-xxl font-bold mb-3">1. Enter your amount</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Type how much you want to send and we'll show your live exchange rate and commission instantly.
              </p>
            </div>

            <div className="border-2 border-yellow-400 rounded-xl p-6 sm:p-8 bg-[#0D0C1D]">
              <h3 className="text-xl sm:text-xxl font-bold mb-3">2. E-transfer your total</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Send your Total Cost {finalPayAmount !== null && (
                  <> <strong className="text-white"> ({finalPayAmount.toFixed(2)} CAD)</strong></>)}{" "} to 📧 <strong> remit@amaltransfers.ca</strong> and include your recipient's name in the message.
              </p>
            </div>

            <div className="border-2 border-yellow-400 rounded-xl p-6 sm:p-8 bg-[#0D0C1D] md:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-xl font-bold mb-3">3. We deliver your funds</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Once received, we process and confirm your transfer. ✨ For support, call <strong className="text-yellow-500">416-245-0805</strong>.
              </p>
              <span className="text-xs text-gray-400">
                (We’ll collect your personal details automatically when your transfer is received.)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Instructions - Keep this separate
      <div className="bg-[#0D0C1D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white text-black rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">To complete your transfer:</h2>
          <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base">
            <li>
              E-transfer the total amount
              {finalPayAmount !== null && (
                <strong> ({finalPayAmount.toFixed(2)} CAD)</strong>
              )}{" "}
              to: 📧 <strong>remit@amaltransfers.ca</strong>
            </li>
            <li>Include your recipient's name in the e-transfer message.</li>
            <li>Once received, we'll process and confirm your transfer.</li>
          </ol>
          <p className="mt-6 text-sm text-gray-600">
            ✨ For support, call <strong className="text-gray-800">416-245-0805</strong>
            <br />
            <span className="text-xs text-gray-400">
              (We'll collect your personal details automatically when your transfer is received.)
            </span>
          </p>
        </div>
      </div> */}
    </>
  );
}