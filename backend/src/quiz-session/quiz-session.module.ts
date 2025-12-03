import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [QuizSessionController],
  providers: [QuizSessionService, PrismaService, AuthService],
})
export class QuizSessionModule {}
