import { createHash } from "crypto";

export interface CryptoTask {
  id: string;
  payload: string;
}

export class BatchHasherService {
  private cache: Map<string, string> = new Map();
  private maxCacheSize: number;

  constructor(maxCacheSize = 10000) {
    this.maxCacheSize = maxCacheSize;
  }

  public hashPayload(payload: string): string {
    const cached = this.cache.get(payload);
    if (cached) {
      return cached;
    }

    const hash = createHash("sha256").update(payload).digest("hex");
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(payload, hash);
    return hash;
  }

  public processBatch(tasks: CryptoTask[]): Map<string, string> {
    const results = new Map<string, string>();
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      results.set(task.id, this.hashPayload(task.payload));
    }
    return results;
  }

  public clear(): void {
    this.cache.clear();
  }
}
