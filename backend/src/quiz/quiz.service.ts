import { BadRequestException, Injectable } from '@nestjs/common';
import type { User as TelegramUser } from '@tma.js/init-data-node';
import { existsSync, mkdirSync, renameSync } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { QuizType } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { defaultData } from './mock';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  moveQuizFiles(dirId: string, files: string[]) {
    const destDir = path.join(process.cwd(), `uploads/quizzes/${dirId}`);
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

      if (userInDb) {
        const quizId = uuid();
        const images = [createQuizDto.poster];
        const getImagePath = (image: string) =>
          `uploads/quizzes/${quizId}/${image}`;

        console.log('createQuizDto', createQuizDto);

        const data = {
          id: quizId,
          isPublic: false,
          title: createQuizDto.title,
          description: createQuizDto.description,
          poster: getImagePath(createQuizDto.poster),
          authorId: userInDb.id,
          limitedByTime: createQuizDto.limitedByTime,
          authorTelegramId: String(user.id),
          type: QuizType.USER_GENERATED,
          questions: {},
        };

        if (createQuizDto.questions?.length) {
          data.questions = {
            create: createQuizDto.questions.map((question) => {
              if (question.image) images.push(question.image);

              const optionsData = question.options?.map((option) => {
                if (option.image) images.push(option.image);
                return {
                  image: option.image ? getImagePath(option.image) : null,
                  ...option,
                };
              });

              // Создаем объект options только если есть данные и массив не пустой
              const optionsCreate =
                optionsData && optionsData.length > 0
                  ? { createMany: { data: optionsData } }
                  : undefined;

              return {
                text: question.text,
                order: question.order,
                image: question.image ? getImagePath(question.image) : null,
                type: question.type,
                options: optionsCreate,
              };
            }),
          };
        }

        this.moveQuizFiles(quizId, images);

        return this.prisma.quiz.create({ data });
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
          orderBy: {
            createdAt: 'desc',
          },
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
        include: {
          author: true,
          questions: {
            include: {
              options: true,
            },
          },
        },
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
