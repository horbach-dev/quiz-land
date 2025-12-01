// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
// Импортируем нужные функции из пакета
import { parse, validate, User } from '@tma.js/init-data-node';

@Injectable()
export class AuthService {
  // Получите токен вашего бота из переменных окружения
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN!;

  // Метод валидации: теперь он намного проще
  validateInitData(initDataRaw: string): boolean {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    try {
      // Пакет сам проверит хеш и, опционально, срок годности данных (по умолчанию 24 часа)
      validate(initDataRaw, this.botToken);
      return true; // Если ошибок нет, данные валидны
    } catch (error) {
      // Если валидация не удалась, выбрасываем исключение
      throw new UnauthorizedException(`Invalid TMA Data: ${error.message}`);
    }
  }

  // Метод парсинга данных пользователя:
  parseInitData(initDataRaw: string): User | null {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    try {
      // Парсим данные. Можно совместить с валидацией,
      // но лучше вызвать validateInitData() до этого в Guard
      const data = parse(initDataRaw);
      console.log(data);
      return data.user || null;
    } catch (error) {
      throw new UnauthorizedException(`Error parsing TMA Data: ${error.message}`);
    }
  }
}
