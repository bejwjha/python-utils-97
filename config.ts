export interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
}

const config: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
};

export default config;

export const getConfig = (): Config => {
    return config;
};

export const setConfig = (newConfig: Partial<Config>): void => {
    Object.assign(config, newConfig);
};
