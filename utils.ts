import { Currency, ExchangeRate } from './types';

export class CurrencyConverter {
    private rates: Record<string, ExchangeRate>;

    constructor(rates: Record<string, ExchangeRate>) {
        this.rates = rates;
    }

    convert(amount: number, from: Currency, to: Currency): number | null {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error('Invalid currency provided.');
        }
        const rate = this.rates[from][to];
        if (!rate) {
            throw new Error(`Exchange rate not available for ${from} to ${to}.`);
        }
        return amount * rate;
    }
}

export const validateCurrency = (currency: Currency): boolean => {
    const validCurrencies = Object.keys(this.rates);
    if (!validCurrencies.includes(currency)) {
        throw new Error('Unsupported currency.');
    }
    return true;
};
