import { useQuery } from '@tanstack/react-query';

import { getUserData } from '../api/getUserData.ts';

export function useUserQuery() {
  const { data, ...query } = useQuery({
    queryKey: ['getUserData'],
    queryFn: getUserData,
    refetchOnMount: false,
  });

  return { data, ...query };
}
