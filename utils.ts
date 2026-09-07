/**
 * Converts a Uint8Array buffer into a hexadecimal string.
 *
 * @param bytes - The byte array to convert.
 * @returns The hex representation of the bytes.
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Converts a hexadecimal string into a Uint8Array.
 *
 * @param hex - The hex string to convert.
 * @returns The corresponding byte array.
 * @throws {Error} If the hex string has an invalid length or characters.
 */
export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    if (isNaN(byte)) {
      throw new Error("Invalid character in hex string");
    }
    bytes[i] = byte;
  }
  return bytes;
}

/**
 * Generates a SHA-256 hash from a UTF-8 string using the Web Crypto API.
 *
 * @param message - The input string to hash.
 * @returns A promise resolving to the SHA-256 hex hash.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return bytesToHex(new Uint8Array(hashBuffer));
}