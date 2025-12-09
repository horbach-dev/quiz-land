import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '../api/updateUser';

export function useUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['getUserData'], data);
    },
  });
}
