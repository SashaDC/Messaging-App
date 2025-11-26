import db from './connection.ts'
import { MessageData } from '../../models/message.ts'

export async function deleteMessage(messageID: number, friendshipID: number) {
  await db('messages')
    .where({ id: messageID, friendship_id: friendshipID })
    .delete()
}

export async function addMessage(messageData: MessageData) {
  return await db('messages')
    .insert({
      friendship_id: messageData.friendshipId,
      sender_id: messageData.senderId,
      message: messageData.message,
      created_at: messageData.createdAt,
    })
    .returning('*')
}

export async function getMessages(authId: string) {
  // Get all friendships where this user is involved
  const relationships = await db('relationships')
    .where('user_one_id', authId)
    .orWhere('user_two_id', authId)
    .select('id')

  const relationshipIds = relationships.map((r) => r.id)

  if (relationshipIds.length === 0) {
    return []
  }

  // Get all messages from those relationships
  return db('messages')
    .whereIn('friendship_id', relationshipIds)
    .select('*')
    .orderBy('created_at', 'asc')
}
