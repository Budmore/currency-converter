export function formatCurrency(
  value: number,
  currency: string,
  locale = "en-US"
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(value);
}
