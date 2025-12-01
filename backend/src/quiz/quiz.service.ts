import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { defaultData } from './mock';

@Injectable()
export class QuizService {
  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultData);
      }, 3000);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
