import "./CurrencyInput.css";

interface CurrencyInputProps {
  value: string;
  currency: string;
  currencies: string[];
  onValueChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
}

export function CurrencyInput({
  value,
  currency,
  currencies,
  onValueChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div className="currency-input">
      <input
        type="text"
        className="currency-input__value"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="0.00"
      />
      <div className="currency-input__select">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
