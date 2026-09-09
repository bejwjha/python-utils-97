import { createHash, createHmac, timingSafeEqual, randomBytes, pbkdf2Sync } from 'crypto';

export function sha256(data: string | Buffer): string {
  return createHash('sha256').update(data).digest('hex');
}

export function hmacSha256(key: string | Buffer, data: string | Buffer): string {
  return createHmac('sha256', key).update(data).digest('hex');
}

export function generateSalt(length: number = 16): string {
  return randomBytes(length).toString('hex');
}

export function pbkdf2(password: string, salt: string, iterations = 100000, keylen = 64): string {
  return pbkdf2Sync(password, salt, iterations, keylen, 'sha256').toString('hex');
}

export function secureCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}