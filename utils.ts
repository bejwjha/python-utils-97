export interface CryptoData {
  symbol: string;
  price: number;
  timestamp: number;
}

export const sanitizePrice = (value: unknown): number => {
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  if (typeof parsed !== 'number' || isNaN(parsed)) {
    throw new Error('invalid numeric value');
  }
  return Math.max(0, parsed);
};

export const formatPair = (base: string, quote: string): string => {
  return `${base.toUpperCase()}/${quote.toUpperCase()}`;
};

export const parseCryptoResponse = (raw: Record<string, any>): CryptoData => {
  return {
    symbol: String(raw.s || 'UNKNOWN'),
    price: sanitizePrice(raw.p),
    timestamp: Date.now()
  };
};

export const calculatePercentageChange = (curr: number, prev: number): number => {
  if (prev === 0) return 0;
  return ((curr - prev) / prev) * 100;
};