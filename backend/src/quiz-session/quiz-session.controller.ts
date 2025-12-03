import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { ReqUser, type TUser } from '../user/user.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post()
  @UseGuards(AuthGuard)
  startSession(@ReqUser() user: TUser, @Body() quizId: string) {
    return this.quizSessionService.startSession(user.id, quizId);
  }
}
