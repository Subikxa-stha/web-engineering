import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUsers, fetchUser } from '../api/users.js';

export const useUsers = () => useQuery({ queryKey: ['users'], queryFn: fetchUsers });
export const useUser = (id) => useQuery({ queryKey: ['users', id], queryFn: () => fetchUser(id), enabled: !!id });

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (created) => {
      // JSONPlaceholder is read-only, so update the cached list locally.
      // With a real API, invalidateQueries would be preferred as the server
      // may add fields or normalize the created record.
      queryClient.setQueryData(['users'], (old = []) => [...old, created]);
    },
  });
}