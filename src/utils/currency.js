const currencySymbols = {
  usd: "$",
  gbp: "£",
  eur: "€",
  aud: "A$",
  cad: "C$",
  chf: "CHF",
  dkk: "DKK",
};

export const formatCurrency = (amount, currency) => {
  const symbol =
    currencySymbols[currency.toLowerCase()] || currency.toUpperCase();

  return `${symbol}${amount}`;
};
