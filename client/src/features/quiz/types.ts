export type TQuizCategory = ''

export type TQuiz = {
  id: string,
  title: string,
  description: string,
  poster: string,
  category: TQuizCategory,
  authorId: string,
  isPublic: boolean,
  questions: TQuizQuestion[],
  limitedByTime: boolean,
  settings: TQuizSettings,
  createdAt: string,
  updatedAt: string,
}

export type TQuizQuestion = {
  id: string,
  order: number,
  text: string,
  quizId: string,
  options: TQuizOption[]
  type: TQuizQuestionType,
  weight: number,
  image: string | null,
}

export type TQuizQuestionType = 'TEXT_ANSWER' | 'SINGLE_CHOICE' | 'MULTI_CHOICE'

export type TQuizOption = {
  id: string,
  image: string | null,
  questionId: string,
  text: string,
  isCorrect: boolean,
}

export type TQuizSettings = {
  id: string,
  quiz_id: string,
  time_limit: number | null,
  show_timer: boolean,
  scoring_mode: TQuizRulesets
  passing_score: number | null,
  shuffle_questions: boolean,
  shuffle_answers: boolean,
  show_correct_answers: boolean,
}

export type TQuizAttempt = {
  id: string,
  quiz_id: string,
  user_id: string,
  started_at: string,
  finished_at: string,
  duration_sec: number,
  score: number,
  correct_count: number,
  ruleset_used: string,
}

export type TQuizRulesets = {
  id: string,
  code: string,
  name: string,
  description: string,
}
