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
import { AuthGuard } from '../auth/auth.guard';
import { ReqUser, type TUser } from '../user/user.decorator';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createQuizDto: CreateQuizDto, @ReqUser() user: TUser) {
    return this.quizService.create(createQuizDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findQuizzes(
    @Query('type') type: 'my' | 'friends' | 'public',
    @ReqUser() user: TUser,
  ) {
    return this.quizService.findQuizzes(type, user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @ReqUser() user: TUser) {
    return this.quizService.remove(id, user.id);
  }
}
