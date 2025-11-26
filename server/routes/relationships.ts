import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import type { Friend } from '../../models/friend.ts'

import * as db from '../db/relationships.ts'

const router = Router()

router.delete(
  '/:currentUserId/:friendId',
  checkJwt,
  async (req: JwtRequest, res) => {
    if (!req.auth?.sub) {
      res.sendStatus(StatusCodes.UNAUTHORIZED)
      return
    }
    try {
      const { currentUserId, friendId } = req.params
      const isDeleted = await db.deleteRelationship(currentUserId, friendId)
      isDeleted
        ? res.status(StatusCodes.OK).send(true)
        : res.status(StatusCodes.NOT_FOUND).send(false)
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : 'Error deleting friendship',
      )
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

router.get('/accepted/:id', async (req, res) => {
  try {
    const allFriends: Friend[] = await db.getAcceptedFriends(req.params.id)
    res.json(allFriends)
  } catch (err) {
    console.error(
      err instanceof Error
        ? err.message
        : 'Error getting accepted friends by current user id',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/all/:id', async (req, res) => {
  try {
    const allFriends: Friend[] = await db.getAllFriends(req.params.id)
    res.json(allFriends)
  } catch (err) {
    console.error(
      err instanceof Error
        ? err.message
        : 'Error getting all friends by current user id',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
