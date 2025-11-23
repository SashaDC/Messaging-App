import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/relationships.ts'

const router = Router()

router.delete('/:currentUserId/:friendId', async (req, res) => {
  // if (!req.auth?.sub) {
  //   res.sendStatus(StatusCodes.UNAUTHORIZED)
  //   return
  // }
  try {
    const { currentUserId, friendId } = req.params
    const isDeleted = await db.deleteRelationship(currentUserId, friendId)
    isDeleted
      ? res.sendStatus(StatusCodes.NO_CONTENT)
      : res.sendStatus(StatusCodes.NOT_FOUND)
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error deleting message')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
