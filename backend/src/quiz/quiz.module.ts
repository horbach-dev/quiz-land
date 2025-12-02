import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService, AuthService],
})
export class QuizModule {}
