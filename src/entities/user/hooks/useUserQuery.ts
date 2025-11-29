import { useQuery } from '@tanstack/react-query';
import { getUserData } from "../api/getUser";
import { useTelegramUser } from "@/entities/user";

export function useUserQuery () {
  const tgUser = useTelegramUser()

  return useQuery({
    queryKey: ['getUser', tgUser.id],
    queryFn: () => getUserData(tgUser),
    select: (data) => {
      return {
        ...data,
        username: tgUser.username,
        last_name: tgUser.last_name,
        first_name: tgUser.first_name,
        avatar: tgUser.avatar,
      }
    },
  })
}
