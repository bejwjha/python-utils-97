import { createHmac } from 'crypto';

export function generateHmac(secret: string, data: string, algorithm: string = 'sha256'): string {
    const hmac = createHmac(algorithm, secret);
    hmac.update(data);
    return hmac.digest('hex');
}

export function isValidSignature(secret: string, data: string, signature: string, algorithm: string = 'sha256'): boolean {
    const expectedSignature = generateHmac(secret, data, algorithm);
    return expectedSignature === signature;
}

export function formatCryptoData(data: any): string {
    return JSON.stringify(data, null, 2);
}

export function parseCryptoData(data: string): any {
    try {
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Invalid JSON format');
    }
}