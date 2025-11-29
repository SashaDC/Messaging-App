import { WebSocketServer } from 'ws'
import * as messagesDb from '../db/messages'

export function setupWebSocket(wss: WebSocketServer) {
  wss.on('connection', (ws) => {
    // console.log('Client connected')
    ws.on('message', async (data) => {
      try {
        const parsed = JSON.parse(data.toString())

        const messageToStore = {
          friendshipId: parsed.messageData.friendshipId,
          senderId: parsed.messageData.senderId,
          message: parsed.messageData.message, // Text message (can be empty)
          image: parsed.messageData.image, // Image base64 (can be undefined)
          createdAt: parsed.messageData.createdAt,
        }

        const [messageData] = await messagesDb.addMessage(messageToStore)

        const broadcast = {
          type: 'new_message',
          data: {
            id: messageData.id,
            friendship_id: messageData.friendship_id,
            sender_id: messageData.sender_id,
            message: messageData.message,
            image: messageData.image,
            created_at: messageData.created_at,
          },
        }

        wss.clients.forEach((client) => {
          if (client.readyState === 1 && client !== ws) {
            client.send(JSON.stringify(broadcast))
          }
        })
      } catch (err) {
        console.error('WebSocket Handler Messages Error:', err)
      }
    })

    ws.on('close', () => {
      // console.log('Client disconnected')
    })

    ws.on('error', (error) => {
      console.error('WebSocket Handler Connection Error:', error)
    })
  })
}
