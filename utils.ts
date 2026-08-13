import axios from 'axios';

export interface CryptoData {
  symbol: string;
  price: number;
  volume: number;
  marketCap: number;
  percentChange24h: number;
}

export async function fetchCryptoData(symbol: string): Promise<CryptoData | null> {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`);
    const data = response.data[symbol];
    if (!data) return null;
    return {
      symbol,
      price: data.usd,
      volume: data.usd_24h_vol,
      marketCap: data.usd_market_cap,
      percentChange24h: data.usd_24h_change,
    };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
}

export function formatCryptoData(data: CryptoData): string {
  return `Symbol: ${data.symbol}, Price: $${data.price.toFixed(2)}, Volume: $${data.volume.toFixed(2)}, Market Cap: $${data.marketCap.toFixed(2)}, Change (24h): ${data.percentChange24h.toFixed(2)}%`;
}