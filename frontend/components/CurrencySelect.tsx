type CountryOption = {
  label: string;
  currency: string;
};

const countries: CountryOption[] = [
  { label: "United States", currency: "USD" },
  { label: "United Kingdom", currency: "GBP" },
  { label: "Kenya", currency: "KES" },
  { label: "Ethiopia", currency: "ETB" },
  { label: "Uganda", currency: "UGX" },
  { label: "Somalia", currency: "SOS" },
  { label: "South Sudan", currency: "SSP" },
  { label: "Sudan", currency: "SDG" },
  { label: "South Africa", currency: "ZAR" },
  { label: "Germany", currency: "EUR" },
  { label: "Netherlands", currency: "EUR" },
  { label: "Finland", currency: "EUR" },
  { label: "Sweden", currency: "SEK" },
  { label: "Norway", currency: "NOK" },
  { label: "Denmark", currency: "DKK" },
  { label: "Djibouti", currency: "DJF" },
  { label: "Canada", currency: "CAD" },
  { label: "Australia", currency: "AUD" },
  { label: "New Zealand", currency: "NZD" },
  { label: "United Arab Emirates", currency: "AED" },
];

export default function CurrencySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border px-3 py-2"
    >
      <option value="">Select Currency</option>
      {countries.map((c) => (
        <option key={c.currency} value={c.currency}>
          {c.label} ({c.currency})
        </option>
      ))}
    </select>
  );
}
