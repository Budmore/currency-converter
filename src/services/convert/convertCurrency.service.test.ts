import {
  ConversionResult,
  convertCurrency,
  CurrencyConversionResponse,
} from "./convertCurrency.service"; // Adjust the path accordingly

jest.mock("~/config", () => ({
  API_URL: "",
  API_KEY: "mock-api-key",
}));

const params = { from: "USD", to: "EUR", amount: "100" };

describe("convertCurrency", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("successfully converts currency", async () => {
    const mockResult: ConversionResult = {
      timestamp: Date.now(),
      date: new Date().toISOString().split("T")[0],
      from: "USD",
      to: "EUR",
      amount: 100,
      value: 85,
    };

    const mockResponse: CurrencyConversionResponse = {
      meta: { code: 200, disclaimer: "Test conversion" },
      response: mockResult,
      ...mockResult,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        status: 200,
      })
    ) as jest.Mock;

    const result = await convertCurrency(params);

    expect(result.value).toBe(85);
    expect(result.from).toBe("USD");
    expect(result.to).toBe("EUR");
    expect(fetch).toHaveBeenCalledWith(
      "/convert?from=USD&to=EUR&amount=100&api_key=mock-api-key"
    );
  });

  it("should handle the failed request", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    await expect(convertCurrency(params)).rejects.toThrow();
  });
});
