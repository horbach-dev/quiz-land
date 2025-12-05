import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { ReqUser, type TUser } from '../user/user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post('start/:id')
  @UseGuards(AuthGuard)
  getSessionState(@ReqUser() user: TUser, @Param('id') quizId: string) {
    return this.quizSessionService.getSessionState(user.id, quizId);
  }

  @Post('submit-answer')
  @UseGuards(AuthGuard)
  submitAnswer(@Body() answer: SubmitAnswerDto) {
    return this.quizSessionService.submitAnswer(answer);
  }

  @Post('complete/:id')
  @UseGuards(AuthGuard)
  completeSession(@Param('id') sessionId: string) {
    return this.quizSessionService.completeSession(sessionId);
  }

  @Post('update-time')
  @UseGuards(AuthGuard)
  updateTime(@Body() data: { sessionId: string; seconds: number }) {
    return this.quizSessionService.updateSessionTime(
      data.sessionId,
      data.seconds,
    );
  }
}
