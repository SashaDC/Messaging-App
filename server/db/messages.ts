import db from './connection.ts'
import { MessageData } from '../../models/message.ts'

export async function deleteMessage(messageID: number, friendshipID: number) {
    await db('messages').where({ id: messageID, friendship_id: friendshipID }).delete()
} 

export async function addMessage(messageData: MessageData) {
    await db('messages').insert({ 
        friendship_id: messageData.friendshipId, 
        sender_id: messageData.senderId, 
        message: messageData.message,
        created_at: messageData.createdAt 
    })
}