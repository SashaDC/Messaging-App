import {
  useMutation,
  useQueryClient,
  MutationFunction,
  useQuery,
} from '@tanstack/react-query'

import {
  deleteRelationship,
  getAcceptedFriends,
} from '../apis/relationships.ts'

export function useFetchAcceptedFriends(id: string) {
  return useQuery({
    queryKey: [`friendList`],
    queryFn: () => getAcceptedFriends(id),
  })
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendList'] })
    },
  })
  return mutation
}

export function useDeleteRelationship() {
  return useUserMutation(deleteRelationship)
}
