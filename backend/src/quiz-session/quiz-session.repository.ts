import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SessionStatus } from '@prisma/client';

@Injectable()
export class QuizSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findQuiz(quizId: string) {
    return this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  findSession(sessionId: string) {
    return this.prisma.quizSession.findUnique({
      where: { id: sessionId, status: SessionStatus.IN_PROGRESS },
    });
  }

  createSession(userId: string, quizId: string) {
    return this.prisma.quizSession.create({
      data: {
        userId,
        quizId,
        startedAt: new Date(),
        status: SessionStatus.IN_PROGRESS,
      },
      // include: { questions: true }, // Включите, если нужно
    });
  }

  findActiveSession(userId: string, quizId: string) {
    return this.prisma.quizSession.findFirst({
      where: {
        userId,
        quizId,
        status: SessionStatus.IN_PROGRESS,
      },
      orderBy: { startedAt: 'desc' },
      include: { userAnswers: true },
    });
  }

  async deleteSession(userId: string, quizId: string) {
    const sessionsToDelete = await this.prisma.quizSession.findMany({
      where: {
        userId,
        quizId,
        status: SessionStatus.IN_PROGRESS,
      },
      select: { id: true },
    });

    const sessionIds = sessionsToDelete.map(s => s.id);

    if (sessionIds.length > 0) {
      // Удаляем ВСЕ ответы, привязанные к этим сессиям
      await this.prisma.userAnswer.deleteMany({
        where: {
          sessionId: {
            in: sessionIds,
          },
        },
      });

      // Удаляем сами сессии
      await this.prisma.quizSession.deleteMany({
        where: {
          id: {
            in: sessionIds,
          },
        },
      });
    }
  }

  updateAnswer(
    sessionId: string,
    questionId: string,
    submittedOptionIds: string[],
    submittedAnswerText?: string,
  ) {
    return this.prisma.userAnswer.upsert({
      where: {
        sessionId_questionId: {
          sessionId: sessionId,
          questionId: questionId,
        },
      },
      update: {
        submittedOptionIds: submittedOptionIds,
        submittedAnswerText: submittedAnswerText,
      },
      create: {
        sessionId: sessionId,
        questionId: questionId,
        submittedOptionIds: submittedOptionIds,
        submittedAnswerText: submittedAnswerText,
      },
    });
  }

  updateSessionTime(sessionId: string, timeSpentSeconds: number) {
    return this.prisma.quizSession.update({
      where: { id: sessionId },
      data: { timeSpentSeconds },
    });
  }
}
