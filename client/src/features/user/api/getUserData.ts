import { api } from '@/shared/api';

import { type IUserProfile } from '../types';

export const getUserData = async (): Promise<IUserProfile> => {
  const response = await api.get(`/user`);
  return response.data;
};
