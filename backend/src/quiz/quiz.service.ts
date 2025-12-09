import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, renameSync } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { QuizType, SessionStatus, ScoringAlgorithm } from '@prisma/client';
import { FilesService } from '../files/files.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from '../prisma.service';
import type { TUser } from '../user/user.decorator';

@Injectable()
export class QuizService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

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

  async create(createQuizDto: CreateQuizDto, user: TUser) {
    try {
      const quizId = uuid();
      const images = [createQuizDto.poster];
      const getImagePath = (image: string) =>
        `uploads/quizzes/${quizId}/${image}`;

      const data = {
        id: quizId,
        isPublic: false,
        title: createQuizDto.title,
        description: createQuizDto.description,
        poster: getImagePath(createQuizDto.poster),
        authorId: user.id,
        scoringAlgorithm:
          createQuizDto.scoringAlgorithm || ScoringAlgorithm.STRICT_MATCH,
        limitedByTime: createQuizDto.limitedByTime,
        authorTelegramId: String(user.telegramId),
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
                quizId,
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
    } catch (e) {
      console.log('Ошибка создания квиза', e);
      throw new BadRequestException('Ошибка создания квиза');
    }
  }

  findQuizzes(type: 'my' | 'shared' | 'public', userId: string) {
    try {
      if (type === 'my') {
        return this.prisma.quiz.findMany({
          where: { authorId: userId },
          orderBy: { createdAt: 'desc' },
        });
      }

      if (type === 'shared') {
        return this.prisma.quiz.findMany({
          where: {
            accessTo: { has: userId },
            NOT: { authorId: userId },
          },
          include: {
            author: { select: { username: true, id: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        });
      }

      return this.prisma.quiz.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error('Не удалось найти квизы', e);
      return new BadRequestException('Не удалось найти квизы в базе');
    }
  }

  async findOne(id: string, userId: string) {
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
        throw new BadRequestException('Не удалось найти квиз в базе');
      }

      if (quiz.authorId !== userId && !quiz.accessTo.includes(userId)) {
        await this.prisma.quiz.update({
          where: { id: quiz.id },
          data: {
            accessTo: {
              push: userId,
            },
          },
        });
      }

      const activeSession = await this.prisma.quizSession.findFirst({
        where: {
          userId,
          quizId: quiz.id,
          status: SessionStatus.IN_PROGRESS,
        },
        include: {
          userAnswers: true,
        },
        orderBy: { startedAt: 'desc' },
      });

      return { ...quiz, hasActiveSession: !!activeSession };
    } catch (e) {
      console.log('Не удалось найти квиз в базе', e);
      throw new BadRequestException(e instanceof Error ? e.message : e);
    }
  }

  async remove(quizId: string, userId: string) {
    try {
      const quizToDelete = await this.prisma.quiz.findUnique({
        where: { id: quizId },
        select: {
          authorId: true,
          questions: {
            select: {
              image: true,
              options: {
                select: {
                  image: true,
                },
              },
            },
          },
          poster: true,
        },
      });

      if (!quizToDelete) {
        console.log(`Квиз не найден при удалении`);
        throw new BadRequestException('Квиз не найден');
      }

      if (quizToDelete?.authorId !== userId) {
        throw new BadRequestException(
          'У вас нет прав для удаления этого квиза.',
        );
      }

      const result = await this.prisma.quiz.delete({
        where: { id: quizId },
      });

      this.filesService.deleteDirectory(`uploads/quizzes/${quizId}`);

      return {
        success: true,
        message: `Квиз "${result.title}" и все связанные данные успешно удалены.`,
      };
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(`Удаление квиза ${e.message}`);
      throw new BadRequestException(
        e instanceof Error ? e.message : 'Ошибка удаления квиза',
      );
    }
  }
}
