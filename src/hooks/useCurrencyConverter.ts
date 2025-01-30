import { useCallback, useEffect, useState } from "react";
import {
  ConversionResult,
  convertCurrency,
} from "~/services/convert/convertCurrency.service";

export const useCurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConversionResult(null);
    setError(null);
  }, [fromCurrency, toCurrency, amount]);

  const handleConversion = useCallback(async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      setError("All fields must be filled.");
      return;
    }

    try {
      setIsPending(true);
      const result = await convertCurrency({
        from: fromCurrency,
        to: toCurrency,
        amount,
      });
      setConversionResult(result.response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  }, [fromCurrency, toCurrency, amount]);

  return {
    fromCurrency,
    toCurrency,
    amount,
    conversionResult,
    error,
    isPending,
    setFromCurrency,
    setToCurrency,
    setAmount,
    handleConversion,
  };
};
