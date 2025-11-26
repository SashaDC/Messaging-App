import { useState, useEffect, useRef } from 'react'
import type { Message } from '../../models/message'
import { getMessages } from '../apis/messages'

export function useMessages(activeFriendId: number, currentUserId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const ws = useRef<WebSocket | null>(null)

  // !!!!!
  // Use the true or false from this to set user active state? eg. false = red, true = green.
  const [isConnected, setIsConnected] = useState(false)

  // ------------
  // Paul's load messages.
  useEffect(() => {
    async function loadMessages() {
      if (!currentUserId) return
      try {
        const allMessages = await getMessages(currentUserId)
        // switched the for grouped for loop for filter intead, does the same job as before.
        const friendMessages = allMessages.filter(
          (msg) => msg.friendshipId === activeFriendId,
        )
        // Sets the current messages as the specific friend messages.
        setMessages(friendMessages)
      } catch (err) {
        console.error('Error loading messages:', err)
      }
    }
    // Runs the Load function when changing friends.
    loadMessages()
  }, [activeFriendId, currentUserId])

  // ------------
  // WebSocket set up for live messaging
  useEffect(() => {
    // The next 4 lines I needed to search up to get it to work so I'm not too clear on it.
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = import.meta.env.DEV
      ? 'ws://localhost:3000'
      : `${protocol}//${window.location.host}`
    // ------------
    ws.current = new WebSocket(wsUrl)

    // ------------
    // When the websocket is connected.
    ws.current.onopen = () => {
      // console.log('WebSocket connected')
      setIsConnected(true)
    }

    // ------------
    // When the websocket's connection closes.
    ws.current.onclose = () => {
      // console.log('WebSocket closed')
      setIsConnected(false)
    }

    // ------------
    // Websocket error displaying.
    ws.current.onerror = (error) => {
      console.error('WebSocket hook error:', error)
    }

    // ------------
    // This is the display for the friend/other user.
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'new_message') {
          setMessages((prev) => {
            // Only add if this message is for the current friend.
            if (data.data.friendship_id === activeFriendId) {
              const msg: Message = {
                id: data.data.id,
                text: data.data.message,
                sender: data.data.sender_id === currentUserId ? 'me' : 'them',
                createdAt: new Date(data.data.created_at).toLocaleDateString(
                  'en-GB', // en-GB = day/month/year
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                ),
                friendshipId: data.data.friendship_id,
              }
              return [...prev, msg]
            }
            return prev
          })
        }
      } catch (err) {
        console.error('Error parsing message:', err)
      }
    }

    return () => {
      ws.current?.close()
      setIsConnected(false)
    }
  }, [activeFriendId, currentUserId])

  return {
    messages,
    isConnected,
    sendMessage: (friendshipId: number, senderId: string, message: string) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        // ------------
        // This is the wrapper that displays for the current user.
        const optimisticMsg: Message = {
          id: Date.now(),
          text: message,
          sender: 'me',
          createdAt: new Date().toLocaleDateString(
            'en-GB', // en-GB = day/month/year
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            },
          ),
          friendshipId,
        }
        setMessages((prev) => [...prev, optimisticMsg])

        // ------------
        // This is the data that is sent to the database.
        ws.current.send(
          JSON.stringify({
            messageData: {
              friendshipId,
              senderId,
              message,
              createdAt: new Date().toLocaleDateString(
                'en-GB', // en-GB = day/month/year
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                },
              ),
            },
          }),
        )
      }
    },
  }
}
