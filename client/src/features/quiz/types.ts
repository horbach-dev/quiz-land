export type TQuizCategory = ''

export type TQuiz = {
  id: string,
  title: string,
  description: string,
  image: string,
  category: TQuizCategory,
  author: string,
  is_public: boolean,
  settings: TQuizSettings,
  created_at: string,
  updated_at: string,
}

export type TQuizQuestion = {
  id: string,
  quiz_id: string,
  order: number,
  text: string,
  type: TQuizQuestionType,
  weight: number,
  image: string | null,
}

export type TQuizQuestionType = 'single' | 'multiple' | 'text'

export type TQuizAnswer = {
  id: string,
  question_id: string,
  text: string,
  is_correct: boolean,
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
