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

export function useAddmessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (messageData: MessageData) => {
         return addMessage(messageData)
    }
  })
}