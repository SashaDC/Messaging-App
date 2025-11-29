// tests/messages.router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// Mock the db module
vi.mock('../db/messages.ts', () => ({
  getMessages: vi.fn(),
  deleteMessage: vi.fn(),
  addMessage: vi.fn(),
}))

import * as db from '../db/messages.ts'
import messagesRouter from '../routes/messages.ts' // adjust path if needed

// Helper to create an express app with the router
const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use('/messages', messagesRouter)
  return app
}

describe('Messages Router', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp()
    vi.clearAllMocks()
  })

  // ========== GET /:authId ==========
  it('should return messages for valid authId', async () => {
    ;(db.getMessages as any).mockResolvedValue([{ id: 1, text: 'hello' }])

    const res = await request(app).get('/messages/auth123')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: 1, text: 'hello' }])
    expect(db.getMessages).toHaveBeenCalledWith('auth123')
  })

  // ========== DELETE /:friendshipID/:messageID ==========
  it('should delete a message and return 200', async () => {
    ;(db.deleteMessage as any).mockResolvedValue(undefined)

    const res = await request(app).delete('/messages/123/456')
    expect(res.status).toBe(200)
    expect(db.deleteMessage).toHaveBeenCalledWith(123, 456)
  })

  // ========== PUT / ==========
  it('should create a new message and return 201', async () => {
    ;(db.addMessage as any).mockResolvedValue(undefined)

    const message = { sender: 'a', receiver: 'b', text: 'hi' }
    const res = await request(app).put('/messages/').send(message)
    expect(res.status).toBe(201)
    expect(db.addMessage).toHaveBeenCalledWith(message)
  })

  // Optional: test GET error handling
  it('should return 500 if db.getMessages throws', async () => {
    ;(db.getMessages as any).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/messages/auth123')
    expect(res.status).toBe(500)
  })

  it('should return 500 if db.deleteMessage throws', async () => {
    ;(db.deleteMessage as any).mockRejectedValue(new Error('DB error'))

    const res = await request(app).delete('/messages/123/456')
    expect(res.status).toBe(500)
  })

  it('should return 500 if db.addMessage throws', async () => {
    ;(db.addMessage as any).mockRejectedValue(new Error('DB error'))

    const message = { sender: 'a', receiver: 'b', text: 'hi' }
    const res = await request(app).put('/messages/').send(message)
    expect(res.status).toBe(500)
  })
})
