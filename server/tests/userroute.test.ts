// tests/users.router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

// Mock DB functions
vi.mock('../db/users.ts', () => ({
  getUserById: vi.fn(),
  checkUsernameUsed: vi.fn(),
  checkUserExists: vi.fn(),
  addUser: vi.fn(),
  editUser: vi.fn(),
  deleteUser: vi.fn(),
}))

// Mock checkJwt middleware to always pass
vi.mock('../auth0.ts', () => ({
  default: (req: any, res: any, next: any) => {
    req.auth = { sub: 'auth123' }
    next()
  },
}))

// Mock multer middleware
vi.mock('../multerConfig.ts', () => ({
  default: {
    single: () => (req: any, res: any, next: any) => {
      req.file = { path: 'mock/path.jpg' }
      next()
    },
  },
}))

import * as db from '../db/users.ts'
import usersRouter from '../routes/users.ts' // adjust path if needed

const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use('/users', usersRouter)
  return app
}

describe('Users Router', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp()
    vi.clearAllMocks()
  })

  // ===== GET /:id =====
  it('should get user by id', async () => {
    const user = { id: '1', username: 'Alice' }
    ;(db.getUserById as any).mockResolvedValue(user)

    const res = await request(app).get('/users/1')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(user)
    expect(db.getUserById).toHaveBeenCalledWith('1')
  })

  // ===== GET /:id/:username =====
  it('should check if username is used', async () => {
    ;(db.checkUsernameUsed as any).mockResolvedValue(true)

    const res = await request(app).get('/users/1/Alice')
    expect(res.status).toBe(200)
    expect(res.body).toBe(true)
    expect(db.checkUsernameUsed).toHaveBeenCalledWith('Alice', '1')
  })

  // ===== POST / =====
  it('should create a new user if not exists', async () => {
    const newUser = { id: '1', email: 'a@b.com' }
    ;(db.checkUserExists as any).mockResolvedValue(false)
    ;(db.addUser as any).mockResolvedValue(newUser)

    const res = await request(app).post('/users/').send(newUser)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(newUser)
    expect(db.checkUserExists).toHaveBeenCalledWith(newUser)
    expect(db.addUser).toHaveBeenCalledWith(newUser)
  })

  it('should return existing user if already exists', async () => {
    const existingUser = { id: '1', email: 'a@b.com' }
    ;(db.checkUserExists as any).mockResolvedValue(existingUser)

    const res = await request(app).post('/users/').send(existingUser)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(existingUser)
    expect(db.addUser).not.toHaveBeenCalled()
  })

  // ===== PATCH / =====
  it('should edit user and return 200', async () => {
    const updatedUser = { id: '1', username: 'Bob', pfp: 'mock/path.jpg' }
    ;(db.editUser as any).mockResolvedValue(updatedUser)

    const res = await request(app)
      .patch('/users/')
      .send({ id: '1', username: 'Bob' })

    expect(res.status).toBe(200)
    expect(res.body).toEqual(updatedUser)
    expect(db.editUser).toHaveBeenCalledWith('Bob', 'mock/path.jpg', '1')
  
  })

  // ===== Error handling =====
  it('should return 500 if db.getUserById fails', async () => {
    ;(db.getUserById as any).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/users/1')
    expect(res.status).toBe(500)
  })

  it('should return 500 if db.addUser fails', async () => {
    ;(db.checkUserExists as any).mockResolvedValue(false)
    ;(db.addUser as any).mockRejectedValue(new Error('fail'))

    const res = await request(app).post('/users/').send({ id: '1', email: 'a@b.com' })
    expect(res.status).toBe(500)
  })

  it('should return 500 if db.editUser fails', async () => {
    ;(db.editUser as any).mockRejectedValue(new Error('fail'))

    const res = await request(app).patch('/users/').send({ id: '1', username: 'Bob' })
    expect(res.status).toBe(500)
  })
})
