import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import type { Friend } from '../../models/friend.ts'
import { deleteAllMessages } from '../db/messages.ts'

import * as db from '../db/relationships.ts'

const router = Router()

//Deletes all messages and friendship
router.delete('/plus-messages', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }
  try {
    const relationshipId = req.body.relationshipId
    console.log(typeof relationshipId)
    await deleteAllMessages(relationshipId)
    const isDeleted = await db.deleteRelationship(relationshipId)
    isDeleted
      ? res.status(StatusCodes.OK).send(true)
      : res.status(StatusCodes.NOT_FOUND).send(false)
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Error deleting friendship',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

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

//Decline friend request by relationship id, by deleting relationship
router.delete('/decline', async (req, res) => {
  try {
    const { relationshipId } = req.body
    const friendshipIsDeleted: boolean =
      await db.deleteRelationship(relationshipId)
    friendshipIsDeleted
      ? res.sendStatus(StatusCodes.NO_CONTENT)
      : res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Friend request was not declined',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

//Blocks friend by adding blocked status
router.patch('/block', async (req, res) => {
  try {
    const { relationshipId } = req.body
    const friendIsBlocked: boolean = await db.blockRelationship(relationshipId)
    friendIsBlocked
      ? res.sendStatus(StatusCodes.NO_CONTENT)
      : res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Friend was not blocked.',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
