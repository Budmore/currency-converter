import { formatCurrency } from "./formatCurrency";

describe("formatCurrency()", () => {
  it("should formats USD correctly", () => {
    const result = formatCurrency(1234.56, "USD");
    expect(result).toBe("$1,234.56");
  });

  it("should show the EUR symbol as postfix with coma as decimal separator", () => {
    const result = formatCurrency(1234.56, "EUR", "pl-PL");
    expect(result).toBe("1234,56 €");
  });

  it("should show the EUR symbol as prefix and dot as decimal separator", () => {
    const result = formatCurrency(1234.56, "EUR", "en-US");
    expect(result).toBe("€1,234.56");
  });
});
