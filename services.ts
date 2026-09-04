interface CryptoData {
  symbol: string;
  price: number;
  timestamp: number;
}

export const formatCurrency = (amount: number, precision: number = 2): string => {
  return amount.toFixed(precision);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const validateCryptoPayload = (data: unknown): data is CryptoData => {
  const d = data as CryptoData;
  return (
    typeof d?.symbol === 'string' &&
    typeof d?.price === 'number' &&
    typeof d?.timestamp === 'number'
  );
};

export const getMarketSummary = (items: CryptoData[]): Record<string, number> => {
  return items.reduce((acc, item) => {
    acc[item.symbol] = item.price;
    return acc;
  }, {} as Record<string, number>);
};

export const aggregateVolume = (data: CryptoData[]): number => {
  return data.reduce((sum, item) => sum + item.price, 0);
};