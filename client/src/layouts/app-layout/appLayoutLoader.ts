import { retrieveRawInitData } from '@tma.js/sdk-react';

import { getUserData } from '@/features/user/api/getUserData';
import { setAuthHeader } from '@/shared/api';
import { queryClient } from '@/shared/lib';

export const appLayoutLoader = () => {
  const token = retrieveRawInitData();
  if (typeof token === 'string') setAuthHeader(token);

  return {
    userData: queryClient.ensureQueryData({
      queryKey: ['getUserData'],
      queryFn: getUserData,
      staleTime: 30_000,
    }),
  };
};
