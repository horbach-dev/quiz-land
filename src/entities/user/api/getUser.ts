import { createItem, readItems } from '@directus/sdk';
import { directus } from "@/services/directus";
import { type ITelegramUser, type IUserProfile } from "../types";

export const getUser = async (tgUser: ITelegramUser): Promise<IUserProfile | object> => {
  try {
    const existing = await directus.request(readItems('profiles', {
      filter: { telegram_id: { _eq: tgUser.id.toString() } },
      limit: 1
    })) as IUserProfile[] | [];

    if (existing.length) {
      return existing[0];
    }

    return await directus.request(createItem('profiles', {
      telegram_id: tgUser.id.toString(),
      username: tgUser.username || '',
      first_name: tgUser.first_name || '',
      last_name: tgUser.last_name || '',
      avatar: tgUser.avatar || '',
      quizzes_created: 0,
      quizzes_completed: 0,
      average_score: 0,
      total_time_spent: 0,
      joined_at: Date.now(),
      last_active_at: Date.now(),
    })) as IUserProfile;
  } catch (_: any) {
    return {}
  }
}
