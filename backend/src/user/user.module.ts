import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
})
export class UserModule {}
