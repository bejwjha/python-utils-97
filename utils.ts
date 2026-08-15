import { isString, isNumber } from 'lodash';

export function validateInput(input: any): boolean {
    if (!isString(input.address) || !/^(0x)?[0-9a-fA-F]{40}$/.test(input.address)) {
        throw new Error('Invalid address format');
    }
    if (!isNumber(input.amount) || input.amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    return true;
}

export function processTransaction(input: { address: string; amount: number }): string {
    validateInput(input);
    // Processing logic here
    return 'Transaction processed successfully';
}

export function mainLoop(transactions: Array<{ address: string; amount: number }>): void {
    transactions.forEach(transaction => {
        try {
            console.log(processTransaction(transaction));
        } catch (error) {
            console.error(error.message);
        }
    });
}