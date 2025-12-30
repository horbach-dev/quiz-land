import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReqUser, type TUser } from '../user/user.decorator';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto, @ReqUser() user: TUser) {
    return this.quizService.create(createQuizDto, user);
  }

  @Patch(':id')
  update(@Param('id') quizId: string, @Body() createQuizDto: CreateQuizDto) {
    return this.quizService.update(quizId, createQuizDto);
  }

  @Get()
  findQuizzes(
    @Query('type') type: 'my' | 'shared' | 'public',
    @Query('page') page = 1,
    @Query('limit') limit = 15,
    @ReqUser() user: TUser,
  ) {
    return this.quizService.findQuizzes(
      type,
      user.id,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ReqUser() user: TUser) {
    return this.quizService.findOne(id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ReqUser() user: TUser) {
    return this.quizService.remove(id, user.id);
  }
}
