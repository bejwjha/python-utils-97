// Configuration settings for the application

type Config = {
    apiUrl: string;
    timeout: number;
    maxRetries: number;
};

const config: Config = {
    apiUrl: 'https://api.crypto.com',
    timeout: 5000,
    maxRetries: 3,
};

export default config;
