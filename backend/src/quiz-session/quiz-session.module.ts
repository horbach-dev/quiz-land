import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { QuizSessionRepository } from './quiz-session.repository';

@Module({
  controllers: [QuizSessionController],
  providers: [
    QuizSessionService,
    QuizSessionRepository,
    PrismaService,
    AuthService,
  ],
})
export class QuizSessionModule {}
