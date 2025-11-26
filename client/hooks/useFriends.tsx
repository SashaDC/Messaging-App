import {
  useMutation,
  useQueryClient,
  MutationFunction,
  useQuery,
} from '@tanstack/react-query'

import {
  deleteFriend,
  getAcceptedFriends,
  addFriend,
  declineFriendRequest,
  blockFriend,
} from '../apis/friends.ts'

export function useFetchAcceptedFriends(id: string) {
  return useQuery({
    queryKey: [`acceptedFriends`],
    queryFn: () => getAcceptedFriends(id),
  })
}

export function useFetchAllFriends(id: string) {
  const query = useQuery({
    queryKey: [`allFriends`],
    queryFn: () => getAcceptedFriends(id),
  })
  return {
    ...query,
    declineRequest: useDeclineFriendRequest,
  }
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

//Deletes all messages and the relationship
export function useDeleteRelationship() {
  return useUserMutation(deleteFriend)
}

export function useAddFriend() {
  return useUserMutation(addFriend)
}

//Declines friend request by deleting relationship. Does not block friend or delete messages
export function useDeclineFriendRequest() {
  return useUserMutation(declineFriendRequest)
}

//Blocks the user by added blocked status
export function useBlockFriend() {
  return useUserMutation(blockFriend)
}
