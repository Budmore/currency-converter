import { ApiResponse, fetchCurrencies } from "./fetchCurrencies.service";

jest.mock("~/config", () => ({
  API_URL: "",
  API_KEY: "mock-api-key",
}));

describe("fetchCurrencies", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches currencies successfully from an API", async () => {
    const mockApiResponse: ApiResponse = {
      meta: {
        code: 200,
        disclaimer: "test disclaimer",
      },
      response: [
        {
          id: 1,
          name: "US Dollar",
          short_code: "USD",
          code: "840",
          precision: 2,
          subunit: 100,
          symbol: "$",
          symbol_first: true,
          decimal_mark: ".",
          thousands_separator: ",",
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as jest.Mock;

    const result = await fetchCurrencies();
    expect(result.meta.code).toBe(200);
    expect(result.response[0].name).toBe("US Dollar");
    expect(global.fetch).toHaveBeenCalledWith(
      "/currencies?api_key=mock-api-key&type=fiat"
    );
  });

  it("should handle a failed request", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    await expect(fetchCurrencies()).rejects.toThrow();
  });
});
