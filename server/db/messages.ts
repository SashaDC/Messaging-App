import db from './connection.ts'

export async function deleteMessage(messageID: number, friendshipID: number) {
    await db('messages').where({ id: messageID, friendship_id: friendshipID }).delete()
}