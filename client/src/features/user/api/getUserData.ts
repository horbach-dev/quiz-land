import { api } from '@/shared/api';

import { type ITelegramUser, type IUserProfile } from '../types';

export const getUserData = async (
  tgUser: ITelegramUser,
): Promise<IUserProfile> => {
  const response = await api.get(`/user/${tgUser.id}`);
  return response.data;
};
