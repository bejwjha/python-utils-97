import { Cryptocurrency, ApiError } from './types';

export async function fetchCryptoData(cryptoId: string): Promise<Cryptocurrency> {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        if (!response.ok) {
            throw new ApiError(`Error fetching data: ${response.status}`, response.status);
        }
        const data: Cryptocurrency = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            console.error('API Error:', error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
        throw error;
    }
}

export function validateAddress(address: string): boolean {
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    if (!isValid) {
        console.error('Invalid address format');
    }
    return isValid;
}