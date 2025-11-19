import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/users.ts'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.getUserById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userInfo = req.body
    //Check if the user is already in the db by cross checking unique fields (email/username/id)
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
    next(err)
  }
})

export default router
