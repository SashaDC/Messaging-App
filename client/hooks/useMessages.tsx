import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import {
    deleteMessage,
    addMessage
} from '../apis/messages'

import { MessageData } from '../../models/message'

// Waiting on Paul's work to invalidate queries
export function useAddMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (messageData: MessageData) => {
         return addMessage(messageData)
    }
  })
}