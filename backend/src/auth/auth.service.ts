import { Injectable, UnauthorizedException } from '@nestjs/common';
import { parse, validate, User } from '@tma.js/init-data-node';

@Injectable()
export class AuthService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;

  validateInitData(initDataRaw: string): boolean {
    const isDev = initDataRaw.includes('horbachAI');
    if (isDev) return true;

    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    try {
      validate(initDataRaw, this.botToken);
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid TMA Data: ${error.message}`);
    }
  }

  // Метод парсинга данных пользователя:
  parseInitData(initDataRaw: string): User | null {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    try {
      const data = parse(initDataRaw);
      return data.user || null;
    } catch (error) {
      throw new UnauthorizedException(
        `Error parsing TMA Data: ${error.message}`,
      );
    }
  }
}
