import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/** Non-production: skip rate limiting (avoids 429 from polling / demo flows). */
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    return super.shouldSkip(context);
  }
}
