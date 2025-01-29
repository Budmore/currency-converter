import { FormEvent, useContext } from "react";
import { CurrencyInput } from "~/components/CurrencyInput/CurrencyInput";
import { CurrencySelector } from "~/components/CurrencySelector/CurrencySelector";
import { useCurrencyConverter } from "~/hooks/useCurrencyConverter";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { SwapButton } from "../SwapButton/SwapButton";
import "./CurrencyConverter.css";

export function CurrencyConverter() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    conversionResult,
    error: conversionError,
    setFromCurrency,
    setToCurrency,
    setAmount,
    handleConversion,
  } = useCurrencyConverter();

  const { error: currenciesError } = useContext(CurrencyContext);
  const error = currenciesError ?? conversionError;

  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleConversion();
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-converter">
      <h2 className="currency-converter__title">Currency Converter</h2>
      <form className="currency-converter__form" onSubmit={handelSubmit}>
        <CurrencyInput
          name="amount"
          value={amount}
          onChange={setAmount}
          required
        />

        <div className="currency-converter__currencies">
          <CurrencySelector
            name="from-currency"
            currency={fromCurrency}
            onCurrencyChange={setFromCurrency}
          />

          <SwapButton onClick={handleSwap} />

          <CurrencySelector
            name="to-currency"
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
          />
        </div>
        <button className="currency-converter__submit">Convert</button>
      </form>

      {error && <div className="currency-converter__error">{error}</div>}

      {conversionResult && (
        <div className="currency-converter__result">
          <p className="currency-converter__result-text">
            <span className="result-text__from">
              {formatCurrency(conversionResult.amount, conversionResult.from)}
            </span>
            {" = "}
            <span className="result-text__to">
              {formatCurrency(conversionResult.value, conversionResult.to)}
            </span>
          </p>
          <p className="currency-converter__timestamp">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
