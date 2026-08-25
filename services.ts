export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
}

export interface AggregatedData {
  totalMarketCap: number;
  averagePrice: number;
  topGainers: CryptoData[];
}

export function aggregateCryptoData(data: CryptoData[]): AggregatedData {
  if (data.length === 0) {
    return { totalMarketCap: 0, averagePrice: 0, topGainers: [] };
  }

  const totalMarketCap = data.reduce((sum, item) => sum + item.marketCap, 0);
  const averagePrice = data.reduce((sum, item) => sum + item.currentPrice, 0) / data.length;

  const topGainers = [...data]
    .sort((a, b) => b.priceChange24h - a.priceChange24h)
    .slice(0, 3);

  return { totalMarketCap, averagePrice, topGainers };
}

export function filterByPriceRange(data: CryptoData[], minPrice: number, maxPrice: number): CryptoData[] {
  return data.filter(item => item.currentPrice >= minPrice && item.currentPrice <= maxPrice);
}

export function calculateMarketDominance(data: CryptoData[], totalMarketCap: number): Map<string, number> {
  const dominance = new Map<string, number>();
  data.forEach(item => {
    const percent = (item.marketCap / totalMarketCap) * 100;
    dominance.set(item.symbol, parseFloat(percent.toFixed(2)));
  });
  return dominance;
}

export function sortByVolume(data: CryptoData[]): CryptoData[] {
  return [...data].sort((a, b) => b.volume24h - a.volume24h);
}