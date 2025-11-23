import {
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import { deleteRelationship } from '../apis/relationships.ts'

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })
  return mutation
}

export function useDeleteRelationship() {
  return useUserMutation(deleteRelationship)
}
