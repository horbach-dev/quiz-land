import { useQuery } from '@tanstack/react-query';
import { getUserData } from "../api/getUserData";
import { useLaunchParams } from "@tma.js/sdk-react";

export function useUserQuery () {
  const { tgWebAppData } = useLaunchParams()

  const telegramUser = {
    id: String(tgWebAppData?.user?.id || ''),
    language: tgWebAppData?.user?.language_code || 'ru',
    first_name: tgWebAppData?.user?.first_name || '',
    last_name: tgWebAppData?.user?.last_name || '',
    username: tgWebAppData?.user?.username || '',
    avatar: tgWebAppData?.user?.photo_url || '',
  }

  return useQuery({
    queryKey: ['getUserData', telegramUser.id],
    queryFn: () => getUserData(telegramUser),
    select: (data) => {
      return {
        ...data,
        username: telegramUser.username,
        last_name: telegramUser.last_name,
        first_name: telegramUser.first_name,
        avatar: telegramUser.avatar,
      }
    },
  })
}
