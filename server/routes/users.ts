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
    const user = await db.addUser(userInfo)
    user
      ? res.status(StatusCodes.CREATED).send(user)
      : res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  } catch (err) {
    next(err)
  }
})

export default router
