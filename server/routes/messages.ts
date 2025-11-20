import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/messages.ts'
import { redirect } from 'react-router'

const router = Router()

router.delete('/:friendshipID/:messageID', async (req, res) => {
    try {
        const params = req.params
        await db.deleteMessage(Number(params.friendshipID), Number(params.messageID))
    } catch (err) {
        console.error(err instanceof Error ? err.message : 'Error deleting message')
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

export default router