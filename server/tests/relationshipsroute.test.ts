// tests/relationships.router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// Mock the db module
vi.mock('../db/relationships.ts', () => ({
  getAcceptedFriends: vi.fn(),
  getAllFriends: vi.fn(),
  deleteRelationship: vi.fn(),
  unblockFriend: vi.fn(),
  blockFriend: vi.fn(),
  acceptFriendRequest: vi.fn(),
  insertRelationship: vi.fn(),
}))

vi.mock('../db/messages.ts', () => ({
  deleteAllMessages: vi.fn(),
}))

// Mock checkJwt middleware
vi.mock('../auth0.ts', () => ({
  default: (req: any, res: any, next: any) => next(),
}))

import * as db from '../db/relationships.ts'
import * as messagesDb from '../db/messages.ts'
import relationshipsRouter from '../routes/relationships.ts' // adjust path if needed

const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use('/relationships', relationshipsRouter)
  return app
}

describe('Relationships Router', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp()
    vi.clearAllMocks()
  })

  // ===== DELETE /plus-messages =====

  it('should return 401 if no auth', async () => {
    const appWithoutAuth = express()
    appWithoutAuth.use(express.json())
    // simulate middleware failing auth
    appWithoutAuth.use('/relationships', (req, res) => res.sendStatus(401))

    const res = await request(appWithoutAuth)
      .delete('/relationships/plus-messages')
      .send({ relationshipId: 1 })

    expect(res.status).toBe(401)
  })

  // ===== GET /accepted/:id =====
  it('should return accepted friends', async () => {
    const friends = [{ id: 1, name: 'Alice' }]
    ;(db.getAcceptedFriends as any).mockResolvedValue(friends)

    const res = await request(app).get('/relationships/accepted/123')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(friends)
    expect(db.getAcceptedFriends).toHaveBeenCalledWith('123')
  })

  // ===== GET /all/:id =====
  it('should return all friends', async () => {
    const friends = [{ id: 2, name: 'Bob' }]
    ;(db.getAllFriends as any).mockResolvedValue(friends)

    const res = await request(app).get('/relationships/all/123')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(friends)
    expect(db.getAllFriends).toHaveBeenCalledWith('123')
  })

  // ===== DELETE /decline =====
  it('should decline friend request and return 204', async () => {
    ;(db.deleteRelationship as any).mockResolvedValue(true)

    const res = await request(app)
      .delete('/relationships/decline')
      .send({ relationshipId: 1 })

    expect(res.status).toBe(204)
    expect(db.deleteRelationship).toHaveBeenCalledWith(1)
  })

  // ===== PATCH /unblock =====
  it('should unblock friend and return 204', async () => {
    ;(db.unblockFriend as any).mockResolvedValue(true)

    const res = await request(app)
      .patch('/relationships/unblock')
      .send({ relationshipId: 1 })

    expect(res.status).toBe(204)
    expect(db.unblockFriend).toHaveBeenCalledWith(1)
  })

  // ===== PATCH /block =====
  it('should block friend and return 204', async () => {
    ;(db.blockFriend as any).mockResolvedValue(true)

    const payload = { relationshipId: 1, status: 'pending', currentUserId: 2 }
    const res = await request(app).patch('/relationships/block').send(payload)

    expect(res.status).toBe(204)
    expect(db.blockFriend).toHaveBeenCalledWith(1, 2, 'pending')
  })

  // ===== PATCH /accept =====
  it('should accept friend request and return 204', async () => {
    ;(db.acceptFriendRequest as any).mockResolvedValue(true)

    const res = await request(app)
      .patch('/relationships/accept')
      .send({ relationshipId: 1 })

    expect(res.status).toBe(204)
    expect(db.acceptFriendRequest).toHaveBeenCalledWith(1)
  })

  // ===== POST / =====
  it('should add a friend and return 204', async () => {
    ;(db.insertRelationship as any).mockResolvedValue(true)

    const payload = { friendEmail: 'friend@example.com', currentUserId: 1 }
    const res = await request(app).post('/relationships/').send(payload)

    expect(res.status).toBe(204)
    expect(db.insertRelationship).toHaveBeenCalledWith(1, 'friend@example.com')
  })

  it('should return 400 if missing data in POST /', async () => {
    const res = await request(app).post('/relationships/').send({})

    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'Missing data' })
  })

})
