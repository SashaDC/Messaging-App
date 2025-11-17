import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import { getUserById, addUser } from '../apis/users.ts'

export function useUserById(id: string) {
  const query = useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUserById(id),
  })
  return {
    ...query,
    addUser: useAddUser(),
  }
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

function useAddUser() {
  return useUserMutation(addUser)
}
