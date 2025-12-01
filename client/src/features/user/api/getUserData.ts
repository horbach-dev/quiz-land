import { type ITelegramUser, type IUserProfile } from "../types";
import { api } from "@/shared/api";

export const getUserData = async (tgUser: ITelegramUser): Promise<IUserProfile | object> => {
  try {
    const response = await api.get(`/user/${tgUser.id}`);
    console.log(response)

    return new Promise<IUserProfile>((resolve) => {
      resolve({
        id: '12',
        telegram_id: tgUser.id,
        username: tgUser.username,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        avatar: tgUser.avatar,
        quizzes_created: 1,
        quizzes_completed: 7,
        average_score: 0,
        total_time_spent: 120,
        joined_at: '',
        last_active_at: ''
      });
    })
  } catch (_: any) {
    return {}
  }
}
