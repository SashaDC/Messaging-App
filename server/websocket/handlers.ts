import { WebSocketServer } from 'ws'
import * as messagesDb from '../db/messages'

export function setupWebSocket(wss: WebSocketServer) {
  wss.on('connection', (ws) => {
    // console.log('Client connected')
    ws.on('message', async (data) => {
      try {
        const parsed = JSON.parse(data.toString())
        const [messageData] = await messagesDb.addMessage(parsed.messageData)

        const broadcast = {
          type: 'new_message',
          data: {
            id: messageData.id,
            friendship_id: messageData.friendship_id,
            sender_id: messageData.sender_id,
            message: messageData.message,
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
