export type TQuizCategory = '';
export type TQuizQuestionField = 'TEXT' | 'IMAGE';
export type TQuizQuestionType = 'TEXT_ANSWER' | 'SINGLE_CHOICE' | 'MULTI_CHOICE';
export type TQuizSessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED' | 'TIMED_OUT';

export type TQuiz = {
  id: string;
  title: string;
  description: string;
  poster: string;
  category: TQuizCategory;
  authorId: string;
  author?: TQuizAuthor;
  isPublic: boolean;
  questions: TQuizQuestion[];
  limitedByTime: boolean;
  createdAt: string;
  updatedAt: string;
  hasActiveSession?: boolean;
};

export type TQuizSession = {
  id: string;
  createdAt: string;
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  userId: string;
  quizId: string;
  score: number | null;
  nextQuestionId?: string | null;
  userAnswers?: TQuizAnswer[];
  scoringAlgorithm: string | null;
  status: TQuizSessionStatus;
  timeSpentSeconds: number;
};

export type TSessionCompleted = {
  id: string;
  score: number | null;
  totalQuestions: number;
  timeSpentSeconds: number;
};

export type TQuizAnswer = {
  id: string;
  sessionId: string;
  questionId: string;
  submittedOptionIds: string[];
  submittedAnswerText?: string;
  timeSpentSeconds: number;
};

export type TQuizOption = {
  id: string;
  image: string | null;
  order: number;
  questionId: string;
  text: string;
  isCorrect: boolean;
};

export type TQuizQuestion = {
  id: string;
  order: number;
  text: string;
  quizId: string;
  field: TQuizQuestionField;
  options: TQuizOption[];
  type: TQuizQuestionType;
  weight: number;
  image: string | null;
};

type TQuizAuthor = {
  id: string;
  username: string;
  avatar: string;
};
