import { BigNumber } from 'bignumber.js';

export function formatCurrency(amount: string | number, decimals: number = 2): string {
    return new BigNumber(amount).toFormat(decimals);
}

export function calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return (part / total) * 100;
}

export function isValidAddress(address: string): boolean {
    const regExp = /^0x[a-fA-F0-9]{40}$/;
    return regExp.test(address);
}

export function roundToDecimals(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

export function safeParseJSON(jsonString: string): any {
    try {
        return JSON.parse(jsonString);
    } catch {
        return null;
    }
}