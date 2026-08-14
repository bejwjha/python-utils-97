import axios from 'axios';

export class CryptoService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'https://api.coingecko.com/api/v3';
    }

    public async getCoinMarketData(coinId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/coins/${coinId}/market_chart`, {
                params: { vs_currency: 'usd', days: '1' }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching market data');
        }
    }

    public async getPriceHistory(coinId: string, days: number): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/coins/${coinId}/market_chart`, {
                params: { vs_currency: 'usd', days } 
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching price history');
        }
    }
}