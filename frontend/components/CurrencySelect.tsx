// type CountryOption = {
//   label: string;
//   currency: string;
// };

// const countries: CountryOption[] = [
//   { label: "Australia", currency: "AUD" },
//   { label: "Austria", currency: "EUR" },
//   { label: "Belgium", currency: "EUR" },
//   { label: "Canada", currency: "CAD" },
//   { label: "Croatia", currency: "EUR" },
//   { label: "Cyprus", currency: "EUR" },
//   { label: "Denmark", currency: "DKK" },
//   { label: "Djibouti", currency: "DJF" },
//   { label: "Estonia", currency: "EUR" },
//   { label: "Ethiopia", currency: "ETB" },
//   { label: "Finland", currency: "EUR" },
//   { label: "France", currency: "EUR" },
//   { label: "Germany", currency: "EUR" },
//   { label: "Greece", currency: "EUR" },
//   { label: "Ireland", currency: "EUR" },
//   { label: "Italy", currency: "EUR" },
//   { label: "Kenya", currency: "KES" },
//   { label: "Latvia", currency: "EUR" },
//   { label: "Lithuania", currency: "EUR" },
//   { label: "Luxembourg", currency: "EUR" },
//   { label: "Malta", currency: "EUR" },
//   { label: "Netherlands", currency: "EUR" },
//   { label: "New Zealand", currency: "NZD" },
//   { label: "Norway", currency: "NOK" },
//   { label: "Portugal", currency: "EUR" },
//   { label: "Slovakia", currency: "EUR" },
//   { label: "Slovenia", currency: "EUR" },
//   { label: "Somalia", currency: "SOS" },
//   { label: "South Africa", currency: "ZAR" },
//   { label: "South Sudan", currency: "SSP" },
//   { label: "Spain", currency: "EUR" },
//   { label: "Sudan", currency: "SDG" },
//   { label: "Sweden", currency: "SEK" },
//   { label: "Uganda", currency: "UGX" },
//   { label: "United Arab Emirates", currency: "AED" },
//   { label: "United Kingdom", currency: "GBP" },
//   { label: "United States", currency: "USD" }
// ];


// export default function CurrencySelect({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (val: string) => void;
// }) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full rounded border px-3 py-2"
//     >
//       <option value="">Select Currency</option>
//       {countries.map((c) => (
//         <option key={`${c.label}-${c.currency}`} value={c.currency}>
//           {c.label} ({c.currency})
//         </option>
//       ))}
//     </select>
//   );
// }


// components/CurrencySelect.tsx

export const countries = [
  { label: "USD – 🇺🇸 United States Dollar", currency: "USD" },
  { label: "GBP – 🇬🇧 British Pound", currency: "GBP" },
  { label: "KES – 🇰🇪 Kenyan Shilling", currency: "KES" },
  { label: "ETB – 🇪🇹 Ethiopian Birr", currency: "ETB" },
  { label: "UGX – 🇺🇬 Ugandan Shilling", currency: "UGX" },
  { label: "SOS – 🇸🇴 Somali Shilling", currency: "SOS" },
  { label: "SSP – 🇸🇸 South Sudanese Pound", currency: "SSP" },
  { label: "SDG – 🇸🇩 Sudanese Pound", currency: "SDG" },
  { label: "ZAR – 🇿🇦 South African Rand", currency: "ZAR" },
  { label: "EUR – 🇩🇪 Germany (Euro)", currency: "EUR" },
  { label: "EUR – 🇳🇱 Netherlands (Euro)", currency: "EUR" },
  { label: "EUR – 🇫🇮 Finland (Euro)", currency: "EUR" },
  { label: "SEK – 🇸🇪 Swedish Krona", currency: "SEK" },
  { label: "NOK – 🇳🇴 Norwegian Krone", currency: "NOK" },
  { label: "DKK – 🇩🇰 Danish Krone", currency: "DKK" },
  { label: "DJF – 🇩🇯 Djiboutian Franc", currency: "DJF" },
  { label: "CAD – 🇨🇦 Canadian Dollar", currency: "CAD" },
  { label: "NZD – 🇳🇿 New Zealand Dollar", currency: "NZD" },
  { label: "AED – 🇦🇪 Emirati Dirham", currency: "AED" },
  { label: "AUD – 🇦🇺 Australian Dollar", currency: "AUD" },
];

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export default function CurrencySelect({ selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border px-2 py-2 rounded w-full"
    >
      <option value="">🌍 Select currency</option>
      {countries.map((c, index) => (
        <option key={`${c.label}-${index}`} value={c.currency}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
