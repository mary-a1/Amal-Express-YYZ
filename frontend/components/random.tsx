// import React from 'react';
// import CurrencyCalculator from './CurrencyCalculator';

// interface HeroSectionProps {
//   setFinalPayAmount: (amount: number) => void;
// }

// export default function HeroSection({ setFinalPayAmount }: HeroSectionProps) {
//   return (
//     <section className="flex flex-col-reverse md:flex-row justify-center items-start gap-8 px-4 py-12 max-w-7xl mx-auto">
//       <div className="flex-1">
//         <h1 className="text-4xl font-bold leading-tight mb-4">
//           Send Money Smarter, Faster,
//           <span className="text-yellow-400">Everywhere.</span>
//         </h1>
//         <p className="text-lg text-gray-300 mb-8">
//           A simpler way to move money — transparent rates, no hidden fees, and transfers that just work.
//         </p>

//         {/*  */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <h3 className="font-semibold text-yellow-400 text-lg">1</h3>
//             <p className="font-bold">Enter your amount</p>
//             <p className="text-sm text-gray-400">
//               Choose how much to send or receive — we’ll show exchange rates instantly.
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-yellow-400 text-lg">2</h3>
//             <p className="font-bold">E-transfer your total</p>
//             <p className="text-sm text-gray-400">
//               Send the total in CAD to remit@amaltransfers.ca including your recipient’s name.
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold text-yellow-400 text-lg">3</h3>
//             <p className="font-bold">We deliver your funds</p>
//             <p className="text-sm text-gray-400">
//               Once your e-transfer arrives we process and confirm your transfer right away.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1">
//         <CurrencyCalculator setFinalPayAmount={setFinalPayAmount} />
//       </div>
//     </section>
//   );
// }
