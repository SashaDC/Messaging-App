import {
  useMutation,
  useQueryClient,
  MutationFunction,
  useQuery,
} from '@tanstack/react-query'

import {
  deleteRelationship,
  getAcceptedFriends,
  addFriend,
} from '../apis/friends.ts'

export function useFetchAcceptedFriends(id: string) {
  return useQuery({
    queryKey: [`acceptedFriends`],
    queryFn: () => getAcceptedFriends(id),
  })
}

export function useFetchAllFriends(id: string) {
  return useQuery({
    queryKey: [`allFriends`],
    queryFn: () => getAcceptedFriends(id),
  })
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['allFriends'] }),
        queryClient.invalidateQueries({ queryKey: ['acceptedFriends'] }),
      ])
    },
  })
  return mutation
}

export function useDeleteRelationship() {
  return useUserMutation(deleteRelationship)
}

export function useAddFriend() {
  return useUserMutation(addFriend)
}
