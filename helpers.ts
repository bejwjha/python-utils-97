import { BigNumber } from 'bignumber.js';

export function calculateProfit(cost: number, sellPrice: number, quantity: number): number {
    const totalCost = BigNumber(cost).multipliedBy(quantity);
    const totalSellPrice = BigNumber(sellPrice).multipliedBy(quantity);
    return totalSellPrice.minus(totalCost).toNumber();
}

export function convertToUSD(amount: number, exchangeRate: number): number {
    return BigNumber(amount).multipliedBy(exchangeRate).toNumber();
}

export function roundValue(value: number, decimals: number): number {
    return Number(BigNumber(value).decimalPlaces(decimals).toString());
}

export function filterActiveTradePairs(tradePairs: string[], activePairs: string[]): string[] {
    return tradePairs.filter(pair => activePairs.includes(pair));
}

export function calculateRisk(profit: number, drawdown: number): string {
    return drawdown > 0 ? (profit / drawdown).toFixed(2) : 'Infinity';
}