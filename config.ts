export const API_URL = 'https://api.crypto.com';
export const TIMEOUT = 5000;
export const MAX_RETRIES = 3;

export function getHeaders(apiKey: string): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
}

export function validateResponse(response: any): boolean {
    return response && response.status === 200;
}

export const logError = (error: any): void => {
    console.error('API Error:', error);
};

export const parseJson = async (response: Response): Promise<any> => {
    try {
        return await response.json();
    } catch (error) {
        logError(error);
        throw new Error('JSON parsing error');
    }
};