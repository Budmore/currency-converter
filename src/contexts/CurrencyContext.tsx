import { createContext, ReactNode, useEffect, useState } from "react";
import {
  Currency,
  fetchCurrencies,
} from "~/services/currencies/fetchCurrencies.service";

interface CurrencyContextState {
  currencies: Currency[];
  loading: boolean;
  error: string | null;
}

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyContext = createContext<CurrencyContextState>({
  currencies: [],
  loading: true,
  error: null,
});

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchCurrencies();
        setCurrencies(response.response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    init();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currencies, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}
