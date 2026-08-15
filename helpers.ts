import axios from 'axios';

export interface CryptoData {
    symbol: string;
    price: number;
    volume: number;
    marketCap: number;
}

export async function fetchCryptoData(symbol: string): Promise<CryptoData> {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`);
    const data = response.data[symbol];
    return {
        symbol,
        price: data.usd,
        volume: data.usd_24h_vol,
        marketCap: data.usd_market_cap,
    };
}

export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}

export function formatVolume(volume: number): string {
    return `${volume.toLocaleString()} USD`;
}

export function formatMarketCap(marketCap: number): string {
    return `${marketCap.toLocaleString()} USD`;
}
