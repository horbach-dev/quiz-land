export type TQuizCategory = '';
export type TQuizQuestionField = 'TEXT' | 'IMAGE';
export type TQuizQuestionType = 'TEXT_ANSWER' | 'SINGLE_CHOICE' | 'MULTI_CHOICE';
export type TQuizSessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED' | 'TIMED_OUT';
export type TQuizScoringAlgorithm = 'STRICT_MATCH' | 'WEIGHTED_SCALE' | 'PERSONALITY_TEST';
export type TQuizListType = 'public' | 'my' | 'shared' | 'popular' | 'progress' | 'completed';

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
  questionCategories?: { id: string; text: string }[];
  categoriesCounts?: Record<string, number>;
  timeLimit?: number;
  timeLimitChoice?: boolean;
  results?: TQuizResult[];
  resultNotice?: string;
  resultPositive: boolean;
  scoringAlgorithm: TQuizScoringAlgorithm;
  createdAt: string;
  updatedAt: string;
  hasActiveSession?: boolean;
  sessions?: TQuizSession[];
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
  scoringAlgorithm: TQuizScoringAlgorithm;
  status: TQuizSessionStatus;
  timeSpentSeconds: number;
};

export type TSessionCompleted = {
  id: string;
  score: number | null;
  timeSpentSeconds: number;
  scoringAlgorithm: TQuizScoringAlgorithm;
  quiz: TQuiz;
  feedback: string | null;
  feedbackNotice: string | null;
  finalCategory?: string;
  categoryStatistic?: TSessionCategoryStatistic[];
  quizId: string;
  userId: string;
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
  weight: number | null;
  questionId: string;
  category: string | null;
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

type TQuizResult = {
  from?: number;
  to?: number;
  text: string;
  title?: string;
  category?: string;
  conditions?: {
    category: string;
    moreOrEqual: number | null;
    lessOrEqual: number | null;
  }[];
};

export type TSessionCategoryStatistic = {
  id: string;
  title: string;
  value: number;
  count: number;
};
