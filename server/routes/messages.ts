import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/messages.ts'

const router = Router()

// ========== GET all messages for the logged-in user ==========
router.get('/:authId', async (req, res) => {
  try {
    const authId = Number(req.params.authId)

    if (!authId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'authId is required' })
    }

    const messages = await db.getMessages(authId)
    res.json(messages)

  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error fetching messages')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// ========== DELETE a message ==========
router.delete('/:friendshipID/:messageID', async (req, res) => {
  try {
    const { friendshipID, messageID } = req.params

    await db.deleteMessage(Number(friendshipID), Number(messageID))
    res.sendStatus(StatusCodes.OK)

  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error deleting message')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// ========== ADD/SEND message ==========
router.put('/', async (req, res) => {
  try {
    const newMessage = req.body
    await db.addMessage(newMessage)
    res.sendStatus(StatusCodes.CREATED)

  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error sending message')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
