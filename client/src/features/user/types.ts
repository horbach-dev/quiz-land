export interface ITelegramUser {
  id: string;
  language: string;
  first_name: string;
  last_name?: string;
  username?: string;
  avatar?: string;
}

export interface IUserProfile {
  id: string;
  telegram_id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  language?: 'en' | 'ru';
  quizzes_created: number;
  quizzes_completed: number;
  average_score: number;
  total_time_spent: number;
  joined_at: string;
  last_active_at: string;
}
