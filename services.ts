import { isValidAddress } from './utils';
import { fetchCryptoData } from './api';

interface CryptoRequest {
    address: string;
    currency: string;
}

export async function processCryptoRequests(requests: CryptoRequest[]): Promise<void> {
    for (const request of requests) {
        if (!isValidAddress(request.address)) {
            console.error(`Invalid address: ${request.address}`);
            continue;
        }
        const data = await fetchCryptoData(request.address, request.currency);
        console.log(data);
    }
}
