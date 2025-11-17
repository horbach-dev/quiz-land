import { readItems, createItem } from '@directus/sdk';
import { directus } from "@/services/directus";
import type { ITelegramUser } from "@/types/user";

export const login = async (tgUser: ITelegramUser) => {
  const existing = await directus.request(readItems('profiles', {
    filter: { telegram_id: { _eq: tgUser.id.toString() } },
    limit: 1
  }));

  if (existing.length) {
    return existing[0];
  }

  const newProfile = await directus.request(createItem('profiles', {
    telegram_id: tgUser.id.toString(),
    username: tgUser.username || '',
    first_name: tgUser.first_name || '',
    last_name: tgUser.last_name || '',
    avatar: tgUser.photo_url || '',
    quizzes_created: 0,
    quizzes_completed: 0,
    average_score: 0,
    total_time_spent: 0,
    joined_at: Date.now(),
    last_active_at: Date.now(),
  }));

  console.log(newProfile)
}
