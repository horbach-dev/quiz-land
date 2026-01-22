import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, renameSync } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { QuizType, SessionStatus, ScoringAlgorithm } from '@prisma/client';
import { FilesService } from '../files/files.service';
import { CreateQuestionDto, CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from '../prisma.service';
import type { TUser } from '../user/user.decorator';

const getImagePath = (quizId: string, image: string) =>
  `uploads/quizzes/${quizId}/${image}`;

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

      const data = {
        id: quizId,
        isPublic: false,
        title: createQuizDto.title,
        description: createQuizDto.description,
        poster: getImagePath(quizId, createQuizDto.poster),
        authorId: user.id,
        scoringAlgorithm:
          createQuizDto.scoringAlgorithm || ScoringAlgorithm.STRICT_MATCH,
        timeLimit: createQuizDto.timeLimit
          ? Number(createQuizDto.timeLimit)
          : 0,
        timeLimitChoice: !!createQuizDto.timeLimitChoice,
        results: createQuizDto.results,
        resultNotice: createQuizDto.resultNotice,
        resultPositive: createQuizDto.resultPositive,
        authorTelegramId: String(user.telegramId),
        questionCategories: createQuizDto.questionCategories?.map(
          (category) => {
            if (createQuizDto.categoriesCounts) {
              return {
                ...category,
                count: createQuizDto.categoriesCounts[category.id],
              };
            }

            return category;
          },
        ),
        type: QuizType.USER_GENERATED,
        questions: {},
      };

      if (createQuizDto.questions?.length) {
        data.questions = {
          create: this.prepareQuestionData(
            quizId,
            createQuizDto.questions,
            images,
          ),
        };
      }

      this.moveQuizFiles(quizId, images);

      return this.prisma.quiz.create({ data });
    } catch (e) {
      console.log('Ошибка создания квиза', e);
      throw new BadRequestException('Ошибка создания квиза');
    }
  }

  async update(quizId: string, updateQuizDto: CreateQuizDto) {
    try {
      const currentQuiz = await this.prisma.quiz.findUnique({
        where: { id: quizId },
        select: { poster: true },
      });

      if (!currentQuiz) {
        throw new BadRequestException(
          'Невозможно обновить несуществующий квиз',
        );
      }

      return this.prisma.$transaction(async (prisma) => {
        const imagesToMove: string[] = [];
        let newPosterPath = currentQuiz.poster;

        // Если постер обновился, готовим новый путь и добавляем файл в список перемещения
        if (
          updateQuizDto.poster &&
          updateQuizDto.poster !== currentQuiz.poster?.split('/').pop()
        ) {
          console.log('изменение постера');
          newPosterPath = getImagePath(quizId, updateQuizDto.poster);
          imagesToMove.push(updateQuizDto.poster);
        }

        const updateQuizBaseData = {
          title: updateQuizDto.title,
          description: updateQuizDto.description,
          poster: newPosterPath,
          scoringAlgorithm:
            updateQuizDto.scoringAlgorithm || ScoringAlgorithm.STRICT_MATCH,
          timeLimit: updateQuizDto.timeLimit
            ? Number(updateQuizDto.timeLimit)
            : 0,
          timeLimitChoice: !!updateQuizDto.timeLimitChoice,
          results: updateQuizDto.results,
          resultNotice: updateQuizDto.resultNotice,
          resultPositive: updateQuizDto.resultPositive,
          questionCategories: updateQuizDto.questionCategories?.map(
            (category) => {
              if (updateQuizDto.categoriesCounts) {
                return {
                  ...category,
                  count: updateQuizDto.categoriesCounts[category.id],
                };
              }

              return category;
            },
          ),
        };

        await prisma.questionOption.deleteMany({
          where: { quizId: quizId },
        });

        await prisma.question.deleteMany({
          where: { quizId: quizId },
        });

        const newQuestionsData = this.prepareQuestionData(
          quizId,
          updateQuizDto.questions,
          imagesToMove,
        );

        for (const questionData of newQuestionsData) {
          await prisma.question.create({
            data: {
              ...questionData,
              quizId: quizId,
              options: questionData.options,
            },
          });
        }

        if (imagesToMove.length > 0) {
          this.moveQuizFiles(quizId, imagesToMove);
        }

        return prisma.quiz.update({
          where: { id: quizId },
          data: updateQuizBaseData,
        });
      });
    } catch (e) {
      console.log('Ошибка обновления квиза', e);
    }
  }

  private prepareQuestionData(
    quizId: string,
    questionsDto: CreateQuestionDto[],
    imagesToMove: string[],
  ) {
    return questionsDto.map((question, questionOrder) => {
      if (question.image) imagesToMove.push(question.image);

      const optionsData = question.options?.map((option, optionOrder) => {
        if (option.image) imagesToMove.push(option.image);
        return {
          quizId,
          order: optionOrder,
          weight:
            option.weight !== undefined && option.weight !== null
              ? Number(option.weight)
              : null,
          image: option.image ? getImagePath(quizId, option.image) : null,
          text: option.text,
          isCorrect: option.isCorrect,
          category: option.category,
        };
      });

      return {
        order: questionOrder,
        text: question.text,
        image: question.image ? getImagePath(quizId, question.image) : null,
        type: question.type || 'SINGLE_CHOICE',
        field: question.field || 'TEXT',
        options:
          optionsData && optionsData.length > 0
            ? { createMany: { data: optionsData } }
            : undefined,
      };
    });
  }

  findQuizzes(
    type: 'my' | 'shared' | 'public' | 'progress' | 'completed',
    userId: string,
    page: number,
    limit: number,
  ) {
    try {
      const pageNumber = Math.max(1, page);
      const skip = (pageNumber - 1) * limit;

      const baseSelect = {
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      } as const;

      if (type === 'my') {
        return this.prisma.quiz.findMany({
          ...baseSelect,
          where: { authorId: userId },
        });
      }

      if (type === 'progress') {
        return this.prisma.quiz.findMany({
          ...baseSelect,
          where: {
            sessions: {
              some: {
                userId: userId,
                status: SessionStatus.IN_PROGRESS,
              },
            },
          },
          include: {
            sessions: {
              where: { userId, status: SessionStatus.IN_PROGRESS },
              orderBy: { updatedAt: 'desc' },
              take: 1,
            },
          },
        });
      }

      if (type === 'completed') {
        return this.prisma.quiz.findMany({
          ...baseSelect,
          where: {
            sessions: {
              some: {
                userId: userId,
                status: SessionStatus.COMPLETED,
              },
            },
          },
          include: {
            sessions: {
              where: { userId, status: SessionStatus.COMPLETED },
              orderBy: { updatedAt: 'desc' },
              take: 1,
            },
          },
        });
      }

      if (type === 'shared') {
        return this.prisma.quiz.findMany({
          ...baseSelect,
          where: {
            accessTo: { has: userId },
            NOT: { authorId: userId },
          },
          include: {
            author: { select: { username: true, id: true, avatar: true } },
          },
        });
      }

      return this.prisma.quiz.findMany({
        ...baseSelect,
        where: { isPublic: true },
      });
    } catch (e) {
      console.error('Не удалось найти квизы', e);
      throw new BadRequestException('Не удалось найти квизы в базе');
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
