import { api } from '@/shared/api';

import { type IUserProfile } from '../types';

type TParams = {
  language?: string;
  username?: string;
  avatar?: string;
};

export const updateUser = async (data: TParams): Promise<IUserProfile> => {
  const response = await api.patch('/user', data);
  return response.data;
};
