import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as TelegramUser } from '@tma.js/init-data-node';

export const ReqUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TelegramUser => {
    const request = ctx.switchToHttp().getRequest();
    // Мы знаем, что TmaAuthGuard добавляет объект user в request
    return request.user;
  },
);
