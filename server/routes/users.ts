import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/users.ts'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id)
    res.json(user)
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Error retriving user by id',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }
  try {
    const userInfo = req.body
    //Check if the user is already in the db by cross checking email/id fields
    const existingUser = await db.checkUserExists(userInfo)
    //If not in db, add the user to the db. Db will throw an error if the unique fields are not unique
    if (!existingUser) {
      const addedUser = await db.addUser(userInfo)
      addedUser
        ? res.status(StatusCodes.CREATED).send(addedUser)
        : res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
    if (existingUser) {
      res.status(StatusCodes.OK).send(existingUser)
    }
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error validating user')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/usernamecheck/:username', async (req, res) => {
  try {
    const username = req.params.username
    const usernameUsed = await db.checkUsernameUsed(username)
    res.json(usernameUsed? true : false)
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'Error checking username status')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
