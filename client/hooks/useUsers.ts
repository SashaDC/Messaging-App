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
} from '../apis/users.ts'

export function useFetchUserById(id: string) {
  const query = useQuery({
    queryKey: [`currentUser`],
    queryFn: () => getUserById(id),
    refetchOnMount: true,
  })
  return {
    ...query,
    editUser: useEditUser(),
  }
}

export function useCheckIfUsernameTaken(id: string, username: string) {
  return useQuery({
    queryKey: [`user${id}-${username}`],
    queryFn: () => checkUsernameUsed(id, username),
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
      queryClient.invalidateQueries({
        queryKey: ['currentUser'],
        refetchType: 'all',
      })
    },
  })
  return mutation
}

export function useValidateUser() {
  return useUserMutation(validateUser)
}

export function useEditUser() {
  return useUserMutation(editUser)
}

