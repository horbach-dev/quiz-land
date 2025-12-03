import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

const DEFAULT_LANGUAGE = 'ru';

interface CustomRequest extends Request {
  user?: Omit<TelegramUser, 'id'> & {
    id: string;
    telegramId: number;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tmaAuthService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as CustomRequest;

    // Разрешаем CORS OPTIONS запросы
    if (request.method === 'OPTIONS') {
      return true;
    }

    // Заголовок в нижнем регистре
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('tma ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const initDataRaw = authHeader.substring(4);

    try {
      this.tmaAuthService.validateInitData(initDataRaw);
      const telegramUser = this.tmaAuthService.parseInitData(initDataRaw);

      if (!telegramUser?.id) {
        throw new UnauthorizedException('данные Telegram не валидны');
      }

      const dbUser = await this.prisma.user.upsert({
        where: { telegram_id: String(telegramUser.id) },
        update: {
          telegram_id: String(telegramUser.id),
          username: telegramUser.username || undefined,
          first_name: telegramUser.first_name || undefined,
          last_name: telegramUser.last_name || undefined,
          language: telegramUser.language_code || DEFAULT_LANGUAGE,
          avatar: telegramUser.photo_url || undefined,
        },
        create: {
          telegram_id: String(telegramUser.id),
          username: telegramUser.username || undefined,
          first_name: telegramUser.first_name || undefined,
          last_name: telegramUser.last_name || undefined,
          language: telegramUser.language_code || DEFAULT_LANGUAGE,
          avatar: telegramUser.photo_url || undefined,
        },
        select: { id: true, telegram_id: true },
      });

      request.user = {
        ...telegramUser,
        telegramId: telegramUser.id,
        id: dbUser.id,
      };

      return true;
    } catch (e) {
      console.error('Ошибка в AuthGuard:', e);
      throw new UnauthorizedException('Invalid or expired authentication data');
    }
  }
}
