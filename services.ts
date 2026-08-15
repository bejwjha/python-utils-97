import axios from 'axios';

interface CryptoPrice {
    symbol: string;
    price: number;
}

class CryptoService {
    private apiBase: string;

    constructor(apiBase: string) {
        this.apiBase = apiBase;
    }

    async getPrice(symbol: string): Promise<CryptoPrice | null> {
        try {
            const response = await axios.get(`${this.apiBase}/price?symbol=${symbol}`);
            return { symbol, price: response.data.price };
        } catch (error) {
            console.error('Error fetching price:', error);
            return null;
        }
    }

    async getPrices(symbols: string[]): Promise<CryptoPrice[]> {
        const pricePromises = symbols.map(symbol => this.getPrice(symbol));
        return Promise.all(pricePromises);
    }
}

const cryptoService = new CryptoService('https://api.crypto.com');

export default cryptoService;
