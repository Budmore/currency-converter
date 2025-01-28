import { useState } from "react";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import "./CurrencyConverter.css";

export function CurrencyConverter() {
  const [currencies] = useState<string[]>(["PLN", "EUR", "GBP", "USD"]);
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>(currencies[0]);

  return (
    <div className="currency-converter">
      <h2 className="currency-converter__title">Currency Converter</h2>
      <div className="currency-converter__form">
        <CurrencyInput
          value={amount}
          onValueChange={setAmount}
          currency={currency}
          onCurrencyChange={setCurrency}
          currencies={currencies}
        />

        <CurrencyInput
          value={amount}
          onValueChange={setAmount}
          currency={currency}
          onCurrencyChange={setCurrency}
          currencies={currencies}
        />
      </div>
    </div>
  );
}
