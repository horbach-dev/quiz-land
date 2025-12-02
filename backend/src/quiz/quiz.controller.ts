import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { TmaAuthGuard } from '../auth/auth.guard';
import { ReqUser } from '../user/user.decorator';
import type { User as TelegramUser } from '@tma.js/init-data-node';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(TmaAuthGuard)
  create(@Body() createQuizDto: CreateQuizDto, @ReqUser() user: TelegramUser) {
    return this.quizService.create(createQuizDto, user);
  }

  @Get()
  @UseGuards(TmaAuthGuard)
  findQuizzes(
    @Query('type') type: 'my' | 'friends' | 'public',
    @ReqUser() user: TelegramUser,
  ) {
    return this.quizService.findQuizzes(type, String(user.id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
