import { useContext } from "react";

import { CurrencyContext } from "~/contexts/CurrencyContext";
import "./CurrencySelector.css";

export interface CurrencySelectorProps {
  name: string;
  currency: string;
  onCurrencyChange: (value: string) => void;
}

export const CurrencySelector = ({
  name,
  currency,
  onCurrencyChange,
}: CurrencySelectorProps) => {
  const { currencies, loading } = useContext(CurrencyContext);

  return (
    <select
      value={currency}
      name={name}
      onChange={(e) => onCurrencyChange(e.target.value)}
      disabled={loading}
      className="currency-selector"
    >
      {loading && <option>Loading...</option>}
      {currencies?.map((currency) => (
        <option key={currency.id} value={currency.short_code}>
          {currency.short_code}
        </option>
      ))}
    </select>
  );
};
