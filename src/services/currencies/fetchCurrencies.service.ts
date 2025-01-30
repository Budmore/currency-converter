import { API_KEY, API_URL } from "~/config";

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

type CurrenciesType = "fiat" | "crypto";

export interface ApiResponse {
  meta: {
    code: number;
    disclaimer: string;
  };
  response: Currency[];
  [key: Currency["id"]]: Currency;
}

const CURRENCIES_TYPE: CurrenciesType = "fiat";

export async function fetchCurrencies(): Promise<ApiResponse> {
  const serachParams = new URLSearchParams({
    api_key: API_KEY,
    type: CURRENCIES_TYPE,
  }).toString();

  const response = await fetch(`${API_URL}/currencies?${serachParams}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch currencies! status: ${response.status}`);
  }

  return response.json();
}
