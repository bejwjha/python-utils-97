import axios from 'axios';

const API_URL = 'https://api.crypto.com/v1';

interface CryptoData {
    id: string;
    name: string;
    price: number;
}

async function fetchCryptoData(coinId: string): Promise<CryptoData | null> {
    try {
        const response = await axios.get(`${API_URL}/coins/${coinId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
    return null;
}

async function displayCryptoPrice(coinId: string): Promise<void> {
    const data = await fetchCryptoData(coinId);
    if (data) {
        console.log(`The price of ${data.name} is $${data.price}.`);
    } else {
        console.error('Failed to fetch crypto data.');
    }
}

displayCryptoPrice('bitcoin');