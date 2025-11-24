import express from 'express'
import { createServer } from 'http' // Websocket things
import { WebSocketServer } from 'ws' // ----
import * as Path from 'node:path'

import { setupWebSocket } from './websocket/handlers.ts' // WebSocket Connection handler(for messages mainly)
import usersRoutes from './routes/users.ts'
import messagesRoutes from './routes/messages.ts'
import relationshipRoutes from './routes/relationships.ts'

// Renamed server to app due to WebSocket weirdness
const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })

app.use(express.json())

// Server Routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/messages', messagesRoutes)
app.use('/api/v1/relationships', relationshipRoutes)

// Sets up the WebSocket based on the handler file from the WebSocket folder
setupWebSocket(wss)

// Node_Enviroment stuff
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
