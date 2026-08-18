export function calculateTransactionFee(gasPrice: number, gasLimit: number): number {
    return gasPrice * gasLimit;
}

export function isValidAddress(address: string): boolean {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(address);
}

export function formatAmount(amount: number): string {
    return amount.toFixed(4);
}

export function debounce(func: Function, delay: number) {
    let timeoutId: number | null = null;
    return function(...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export function throttle(func: Function, limit: number) {
    let lastFunc: any;
    let lastRan: number;
    return function(...args: any[]) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}