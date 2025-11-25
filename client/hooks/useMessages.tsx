import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import type { Message } from '../../models/message'

// Pauls message fetch:

export function useMessages(activeFriendId: number, currentUserId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    ws.current = new WebSocket(`${protocol}//${window.location.host}`)

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (
        data.type === 'new_message' &&
        data.data.friendship_id === activeFriendId
      ) {
        const msg: Message = {
          id: data.data.id,
          text: data.data.message,
          sender: data.data.sender_id === currentUserId ? 'me' : 'them',
          createdAt: new Date(data.data.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
        setMessages((prev) => [...prev, msg])
      }
    }

    return () => ws.current?.close()
  }, [activeFriendId, currentUserId])

  return {
    messages,
    sendMessage: (friendshipId: number, senderId: string, message: string) => {
      ws.current?.send(
        JSON.stringify({
          messageData: {
            friendshipId,
            senderId,
            message,
            createdAt: new Date(),
          },
        }),
      )
    },
  }
}
