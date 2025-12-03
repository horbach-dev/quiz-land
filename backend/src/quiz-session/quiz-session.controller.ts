import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { ReqUser } from '../user/user.decorator';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { AuthGuard } from '../auth/auth.guard';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post()
  @UseGuards(AuthGuard)
  startSession(@ReqUser() user: TelegramUser, @Body() quizId: string) {
    return this.quizSessionService.startSession(String(user.id), quizId);
  }
}
