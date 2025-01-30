import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { fetchCurrencies } from "~/services/currencies/fetchCurrencies.service";
import { CurrencyContext, CurrencyProvider } from "./CurrencyContext";

jest.mock("~/services/currencies/fetchCurrencies.service", () => ({
  fetchCurrencies: jest.fn(),
}));

const fetchCurrenciesMock = fetchCurrencies as jest.Mock;

const ConsumerComponent = () => (
  <CurrencyContext.Consumer>
    {({ currencies, loading, error }) => (
      <div>
        {loading && <div data-testid="loading" />}
        {error && <div data-testid="error" />}
        <div data-testid="currencies">{JSON.stringify(currencies)}</div>
      </div>
    )}
  </CurrencyContext.Consumer>
);

const renderCurrencyProvider = () =>
  render(
    <CurrencyProvider>
      <ConsumerComponent />
    </CurrencyProvider>
  );

describe("CurrencyProvider", () => {
  it("initially shows loading state", async () => {
    fetchCurrenciesMock.mockResolvedValue({});
    const { getByTestId, queryByTestId } = renderCurrencyProvider();

    expect(getByTestId("loading")).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  it("should shows the error state", async () => {
    const error = new Error("Failed to fetch");
    fetchCurrenciesMock.mockRejectedValue(error);

    const { getByTestId } = renderCurrencyProvider();

    await waitFor(() => {
      expect(getByTestId("error")).toBeInTheDocument();
    });
  });

  it("should displays currencies and stops loading on successful fetch", async () => {
    fetchCurrenciesMock.mockResolvedValue({
      response: [{ code: "USD", name: "United States Dollar" }],
    });

    const { queryByTestId, getByTestId } = renderCurrencyProvider();

    await waitFor(() => {
      expect(queryByTestId("loading")).not.toBeInTheDocument();
      expect(getByTestId("currencies")).toHaveTextContent("USD");
    });
  });
});
