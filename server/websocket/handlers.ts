import { WebSocketServer } from 'ws'
import * as messagesDb from '../db/messages'

// Websocket connection handeling stuff
export function setupWebSocket(wss: WebSocketServer) {
  wss.on('connection', (ws) => {
    // Person Connects
    console.log('Client connected')

    // Person Sends Message
    ws.on('message', async (data) => {
      const parsed = JSON.parse(data.toString())

      // Uses the message db create messages function to send live updates
      // Must change the function when it's created:
      const newMessage = await messagesDb.addMessage(parsed.messageData)

      // Broadcast the live messages for clients
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          // 1 = Open connection
          client.send(
            JSON.stringify({
              type: 'new_message',
              data: newMessage,
            }),
          )
        }
      })
    })

    // Person disconnects
    ws.on('close', () => console.log('Client disconnected'))

    // WebSocket Error Handling
    ws.on('error', (error) => console.log('WebSocket Error:', error))
  })
}

// Since I've been sick I've been using ClaudeAI to help me understand the whole WebSocket thing
// and I can definitely say it's much better than chatGPT for learning
