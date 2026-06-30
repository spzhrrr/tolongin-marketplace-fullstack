import { Injectable } from '@nestjs/common';

/**
 * In-memory JWT token blacklist (used on logout).
 * Production: swap this for Redis-backed implementation.
 */
@Injectable()
export class TokenBlacklistService {
  private blacklist = new Map<string, number>(); // jti -> expiry epoch ms
  private graceUntil = new Map<string, number>(); // jti -> ms until reuse allowed in race

  constructor() {
    // periodic cleanup
    setInterval(() => this.sweep(), 60_000).unref?.();
  }

  add(jti: string, exp: number) {
    this.blacklist.set(jti, exp * 1000);
    this.graceUntil.set(jti, Date.now() + 8000);
  }

  has(jti: string): boolean {
    const grace = this.graceUntil.get(jti);
    if (grace && Date.now() < grace) return false;

    const exp = this.blacklist.get(jti);
    if (!exp) return false;
    if (Date.now() > exp) {
      this.blacklist.delete(jti);
      return false;
    }
    return true;
  }

  private sweep() {
    const now = Date.now();
    for (const [k, v] of this.blacklist) {
      if (now > v) this.blacklist.delete(k);
    }
    for (const [k, v] of this.graceUntil) {
      if (now > v) this.graceUntil.delete(k);
    }
  }
}
