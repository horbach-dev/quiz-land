import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as TelegramUser } from '@tma.js/init-data-node';
import { Request } from 'express';

export type TUser = Omit<TelegramUser, 'id'> & {
  id: string;
  telegramId: number;
};

interface CustomRequest extends Request {
  user: TUser;
}

export const ReqUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TUser => {
    const request = ctx.switchToHttp().getRequest() as CustomRequest;
    return request.user;
  },
);
