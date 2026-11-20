export const formatUSD = (amount) => {
  return `$${Number(amount || 0).toFixed(2)}`;
};

export const formatSLSH = (amount, rate) => {
  const usd = Number(amount || 0);
  const exchangeRate = Number(rate || 0);

  return `SLSh ${(usd * exchangeRate).toLocaleString()}`;
};

export const formatBoth = (amount, rate) => {
  const usd = Number(amount || 0);
  const exchangeRate = Number(rate || 0);

  return {
    usd: `$${usd.toFixed(2)}`,
    slsh: `SLSh ${(usd * exchangeRate).toLocaleString()}`,
  };
};