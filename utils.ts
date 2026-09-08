const byteToHex: string[] = [];
for (let i = 0; i < 256; i++) {
  byteToHex.push(i.toString(16).padStart(2, '0'));
}

export function bytesToHex(bytes: Uint8Array): string {
  const hex: string[] = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    hex[i] = byteToHex[bytes[i]];
  }
  return hex.join('');
}

const hexToByteMap: Record<string, number> = {};
for (let i = 0; i < 256; i++) {
  hexToByteMap[byteToHex[i]] = i;
}

export function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (normalized.length % 2 !== 0) {
    throw new Error('Invalid hex string length');
  }
  const length = normalized.length / 2;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    const byteHex = normalized.substring(i * 2, i * 2 + 2).toLowerCase();
    const byte = hexToByteMap[byteHex];
    if (byte === undefined) {
      throw new Error('Invalid hex character');
    }
    bytes[i] = byte;
  }
  return bytes;
}

export function constantTimeCompare(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}