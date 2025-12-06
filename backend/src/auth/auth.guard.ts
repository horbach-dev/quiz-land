import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { type Cache } from 'cache-manager';
import { Request } from 'express';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

      const telegramUserId = String(telegramUser.id);
      const cacheKey = `user_db_id:${telegramUserId}`;
      let dbUserId = await this.cacheManager.get<string>(cacheKey);

      if (!dbUserId) {
        const dbUser = await this.prisma.user.upsert({
          where: { telegram_id: telegramUserId },
          create: {
            telegram_id: telegramUserId,
            username: telegramUser.username || null,
            first_name: telegramUser.first_name || null,
            last_name: telegramUser.last_name || null,
            language: telegramUser.language_code || DEFAULT_LANGUAGE,
            avatar: telegramUser.photo_url || null,
          },
          update: {
            username: telegramUser.username || undefined,
            first_name: telegramUser.first_name || undefined,
            last_name: telegramUser.last_name || undefined,
            language: telegramUser.language_code || DEFAULT_LANGUAGE,
            avatar: telegramUser.photo_url || undefined,
          },
          select: { id: true, telegram_id: true },
        });

        dbUserId = dbUser.id;
        await this.cacheManager.set(cacheKey, dbUserId, 600);
      }

      request.user = {
        ...telegramUser,
        telegramId: telegramUser.id,
        id: dbUserId,
      };

      return true;
    } catch (e) {
      console.error('Ошибка в AuthGuard:', e);
      throw new UnauthorizedException('Invalid or expired authentication data');
    }
  }
}
