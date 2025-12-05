import { useQuery } from '@tanstack/react-query';
import { getSession } from "../api/start-session";

export function useQuizSessionQuery (id: string) {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['getSession', id],
    queryFn: () => getSession(id),
    enabled: false,
  })
}
