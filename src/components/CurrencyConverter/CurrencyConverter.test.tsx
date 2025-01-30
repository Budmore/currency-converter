import { fireEvent, render, screen } from "@testing-library/react";
import { CurrencyContext } from "~/contexts/CurrencyContext";
import { useCurrencyConverter } from "~/hooks/useCurrencyConverter";
import { CurrencyConverter } from "./CurrencyConverter";

jest.mock("~/hooks/useCurrencyConverter");
jest.mock("~/contexts/CurrencyContext", () => ({
  CurrencyContext: {
    Provider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  },
}));

const useCurrencyConverterMock = useCurrencyConverter as jest.Mock;

describe("CurrencyConverter", () => {
  const mockHandleConversion = jest.fn();
  const mockSetFromCurrency = jest.fn();
  const mockSetToCurrency = jest.fn();
  const mockSetAmount = jest.fn();

  beforeEach(() => {
    useCurrencyConverterMock.mockImplementation(() => ({
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: "100",
      conversionResult: null,
      conversionError: null,
      setFromCurrency: mockSetFromCurrency,
      setToCurrency: mockSetToCurrency,
      setAmount: mockSetAmount,
      handleConversion: mockHandleConversion,
    }));

    render(
      <CurrencyContext.Provider
        value={{ error: null, currencies: [], loading: false }}
      >
        <CurrencyConverter />
      </CurrencyContext.Provider>
    );
  });

  it("calls handleConversion on form submit", () => {
    fireEvent.submit(screen.getByRole("form"));
    expect(mockHandleConversion).toHaveBeenCalled();
  });

  it("calls setAmount when input changes", () => {
    fireEvent.change(screen.getByRole("textbox", { name: /amount/i }), {
      target: { value: "200" },
    });
    expect(mockSetAmount).toHaveBeenCalledWith("200");
  });

  it("handles currency swap correctly", () => {
    fireEvent.click(screen.getByText(/swap/i));
    expect(mockSetFromCurrency).toHaveBeenCalledWith("EUR");
    expect(mockSetToCurrency).toHaveBeenCalledWith("USD");
  });

  // Additional tests can be added to check for error display, result display, etc.
});
