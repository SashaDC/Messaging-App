import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import { getUserById, validateUser } from '../apis/users.ts'

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUserById(id),
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
