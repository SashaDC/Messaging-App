import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import uploadProfileImg from '../multerConfig.ts'

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

//Returns true if the username is being used by a user other than current user
//Returns false if the username is ok to use
router.get('/:id/:username', async (req, res) => {
  try {
    const usernameForbidden: boolean = await db.checkUsernameUsed(
      req.params.username,
      req.params.id,
    )
    res.json(usernameForbidden)
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Error checking username status',
    )
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

//Add new user
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

//Edit existing user
router.patch(
  '/',
  checkJwt,
  uploadProfileImg.single('singleFile'),
  async (req: JwtRequest, res) => {
    if (!req.auth?.sub) {
      res.sendStatus(StatusCodes.UNAUTHORIZED)
      return
    }
    try {
      const pfp = req.file?.path
      const { username, bio, id } = req.body
      const updatedUser = await db.editUser(username, bio, pfp, id)
      updatedUser
        ? res.status(StatusCodes.OK).send(updatedUser)
        : res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : 'Error validating user',
      )
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

//Delete existing user
router.delete('/:id', async (req, res) => {
  try {
    const userID = req.params.id
    await db.deleteUser(userID)
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error deleting message')
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default router
