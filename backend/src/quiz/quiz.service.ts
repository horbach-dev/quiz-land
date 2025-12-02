import { BadRequestException, Injectable } from '@nestjs/common';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { existsSync, mkdirSync, renameSync } from 'fs';
import path from 'path';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { defaultData } from './mock';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  moveQuizFiles(files: string[]) {
    const destDir = path.join(process.cwd(), 'uploads/quizzes');
    const tempDir = path.join(process.cwd(), 'uploads/temp');

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    files.forEach((file) => {
      const tempFilePath = path.join(tempDir, file);

      if (existsSync(tempFilePath)) {
        const newPath = path.join(destDir, file);
        renameSync(tempFilePath, newPath);
      }
    });
  }

  async create(createQuizDto: CreateQuizDto, user: TelegramUser) {
    try {
      const userInDb = await this.prisma.user.findUnique({
        where: { telegram_id: String(user.id) },
      });

      this.moveQuizFiles([createQuizDto.poster]);

      if (userInDb) {
        return this.prisma.quiz.create({
          data: {
            isPublic: false,
            ...createQuizDto,
            poster: `uploads/quizzes/${createQuizDto.poster}`,
            authorId: userInDb.id,
            authorTelegramId: String(user.id),
          },
        });
      }
    } catch (e) {
      console.log('Ошибка создания квиза', e);
      return new BadRequestException('Ошибка создания квиза');
    }

    return {};
  }

  findQuizzes(type: 'my' | 'friends' | 'public', telegramId: string) {
    try {
      if (type === 'my') {
        return this.prisma.quiz.findMany({
          where: { authorTelegramId: telegramId },
        });
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(defaultData);
        }, 3000);
      });
    } catch (e) {
      console.error('Не удалось найти квизы', e);
      return new BadRequestException('Не удалось найти квизы в базе');
    }
  }

  async findOne(id: string) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id },
      });

      if (!quiz) {
        return new BadRequestException('Не удалось найти квиз в базе');
      }

      return quiz;
    } catch (e) {
      console.log('Не удалось найти квиз в базе', e);
      return new BadRequestException('Не удалось найти квиз в базе');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
