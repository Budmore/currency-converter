const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface ConvertParams {
  from: string;
  to: string;
  amount: string;
}

interface CurrencyConversionResponse {
  meta: Meta;
  response: ConversionResult;
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

interface Meta {
  code: number;
  disclaimer: string;
}

export interface ConversionResult {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

export const convertCurrency = async ({
  from,
  to,
  amount,
}: ConvertParams): Promise<CurrencyConversionResponse> => {
  const serachParams = new URLSearchParams({
    from,
    to,
    amount,
    api_key: API_KEY,
  }).toString();

  const response = await fetch(`${API_URL}/convert?${serachParams}`);

  if (!response.ok) {
    throw new Error(`Failed to convert! status: ${response.status}`);
  }

  return response.json();
};
