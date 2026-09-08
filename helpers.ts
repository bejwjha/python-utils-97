import { createHash } from 'crypto';

export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function toWei(amount: number | string, decimals = 18): bigint {
  const strVal = typeof amount === 'number' ? amount.toString() : amount;
  const [whole, fraction = ''] = strVal.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + paddedFraction);
}

export function fromWei(wei: bigint | string, decimals = 18): string {
  const strWei = wei.toString().padStart(decimals + 1, '0');
  const integerPart = strWei.slice(0, -decimals) || '0';
  const fractionalPart = strWei.slice(-decimals).replace(/0+$/, '');
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export function sha256Hex(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}