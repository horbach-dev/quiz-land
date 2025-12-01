// src/auth/tma-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class TmaAuthGuard implements CanActivate {
  constructor(private readonly tmaAuthService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Разрешаем CORS OPTIONS запросы
    if (request.method === 'OPTIONS') {
      return true;
    }

    // Заголовок в нижнем регистре
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('tma ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const initDataRaw = authHeader.substring(4);

    // Используем упрощенный сервис
    this.tmaAuthService.validateInitData(initDataRaw);

    // Добавляем данные пользователя в объект запроса
    request.user = this.tmaAuthService.parseInitData(initDataRaw);

    return true;
  }
}
