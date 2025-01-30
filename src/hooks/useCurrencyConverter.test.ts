import { act, renderHook, waitFor } from "@testing-library/react";
import { convertCurrency } from "~/services/convert/convertCurrency.service";
import { useCurrencyConverter } from "./useCurrencyConverter";

jest.mock("~/services/convert/convertCurrency.service", () => ({
  convertCurrency: jest.fn(),
}));

const convertCurrencyMock = convertCurrency as jest.Mock;

describe("useCurrencyConverter", () => {
  it("should initializes with default values", () => {
    const { result } = renderHook(() => useCurrencyConverter());
    expect(result.current.fromCurrency).toBe("USD");
    expect(result.current.toCurrency).toBe("EUR");
    expect(result.current.amount).toBe("");
    expect(result.current.conversionResult).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handles conversion ", async () => {
    const { result } = renderHook(() => useCurrencyConverter());
    const mockConversionResult = { response: { convertedAmount: 200 } };
    convertCurrencyMock.mockResolvedValue(mockConversionResult);

    act(() => {
      result.current.setAmount("100");
    });

    act(() => {
      result.current.handleConversion();
    });

    expect(result.current.isPending).toBe(true);
    expect(convertCurrencyMock).toHaveBeenCalledWith({
      from: "USD",
      to: "EUR",
      amount: "100",
    });

    await waitFor(() => {
      expect(result.current.conversionResult).toEqual(
        mockConversionResult.response
      );
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
