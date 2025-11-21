import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import {
  getUserById,
  validateUser,
  checkUsernameUsed,
  editUser,
  checkIfUsernameTaken,
} from '../apis/users.ts'

export function useFetchUserById(id: string) {
  const query = useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUserById(id),
  })
  return {
    ...query,
    editUser: useEditUser(),
  }
}

export function useCheckIfUsernameTaken(id: string, username: string) {
  return useQuery({
    queryKey: [`user${id}-${username}`],
    queryFn: () => checkIfUsernameTaken(id, username),
  })
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return mutation
}

export function useValidateUser() {
  return useUserMutation(validateUser)
}

export function useCheckUsernameUsed(username: string) {
  return checkUsernameUsed(username)
}

export function useEditUser() {
  return useUserMutation(editUser)
}
