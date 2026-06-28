import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      return value.map((item) =>
        typeof item === 'string' ? item.trim() : item,
      );
    }

    if (value && typeof value === 'object') {
      const cleaned = {} as Record<string, any>;
      for (const [key, item] of Object.entries(value)) {
        cleaned[key] = typeof item === 'string' ? item.trim() : item;
      }
      return cleaned;
    }

    return value;
  }
}
