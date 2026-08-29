export interface TransactionInput {
  id: string;
  amount: number;
  recipient: string;
  sender: string;
}

export class CryptoProcessingService {
  processLoop(inputs: TransactionInput[]): void {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (!this.isValidInput(input)) {
        continue;
      }
      this.handleTransaction(input);
    }
  }

  private isValidInput(input: TransactionInput): boolean {
    if (typeof input.id !== 'string' || input.id.length === 0) {
      return false;
    }
    if (typeof input.amount !== 'number' || input.amount <= 0 || input.amount > 1000000) {
      return false;
    }
    if (typeof input.recipient !== 'string' || !input.recipient.startsWith('crypto:')) {
      return false;
    }
    if (typeof input.sender !== 'string' || input.sender === input.recipient) {
      return false;
    }
    return true;
  }

  private handleTransaction(input: TransactionInput): void {
    const hash = this.generateHash(input);
    console.log('Validated and processing:', input.id, 'hash:', hash);
  }

  private generateHash(input: TransactionInput): string {
    let hash = '';
    const data = input.id + input.amount + input.recipient;
    for (let i = 0; i < data.length; i++) {
      hash += (data.charCodeAt(i) % 16).toString(16);
    }
    return hash.substring(0, 32);
  }
}