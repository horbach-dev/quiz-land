import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { ReqUser, type TUser } from '../user/user.decorator';
import { QuizSessionRepository } from './quiz-session.repository';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(
    private readonly quizSessionService: QuizSessionService,
    private readonly repository: QuizSessionRepository,
  ) {}

  @Post('start/:id')
  getSessionState(
    @ReqUser() user: TUser,
    @Param('id') quizId: string,
    @Body() params: { restart: boolean },
  ) {
    return this.quizSessionService.startSession(
      user.id,
      quizId,
      params.restart,
    );
  }

  @Post('submit-answer')
  submitAnswer(@Body() answer: SubmitAnswerDto) {
    return this.quizSessionService.submitAnswer(answer);
  }

  @Post('complete/:id')
  completeSession(@Param('id') sessionId: string) {
    return this.quizSessionService.completeSession(sessionId);
  }

  @Get('completed/:id')
  getCompletedSession(@Param('id') sessionId: string) {
    return this.quizSessionService.getCompletedSession(sessionId);
  }

  @Post('update-time')
  updateTime(@Body() data: { sessionId: string; seconds: number }) {
    return this.quizSessionService.updateSessionTime(data);
  }
}
