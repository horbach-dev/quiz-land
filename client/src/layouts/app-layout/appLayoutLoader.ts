import { retrieveRawInitData } from '@tma.js/sdk-react';

import { getUserData } from '@/features/user/api/getUserData';
import { setAuthHeader } from '@/shared/api';
import i18n from '@/shared/config/i18n';
import { queryClient } from '@/shared/lib';

export const appLayoutLoader = () => {
  const token = retrieveRawInitData();
  if (typeof token === 'string') setAuthHeader(token);

  const userData = new Promise((resolve, reject) => {
    queryClient
      .ensureQueryData({
        queryKey: ['getUserData'],
        queryFn: getUserData,
        staleTime: 30_000,
      })
      .then(async (userData) => {
        if (userData?.language) {
          await i18n.changeLanguage(userData.language);
        }

        resolve(userData);
      })
      .catch(reject);
  });

  return { userData };
};
