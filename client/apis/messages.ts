import request from 'superagent'
import { MessageData, Message } from '../../models/message'

const rootURL = new URL(`/api/v1`, document.baseURI)

// DB message type returned by backend
interface DBMessage {
  id: number
  senderId: number
  friendshipId: number
  message: string
  createdAt: string
}

// ---------- GET messages for logged-in user ----------
export async function getMessages(authId: number): Promise<Message[]> {
  const res = await request.get(`${rootURL}/messages/${authId}`)
  const dbMessages = res.body as DBMessage[]

  // Map DBMessage -> UI Message
  return dbMessages.map((msg) => ({
    id: msg.id,
    text: msg.message,               // DB field 'message' -> UI 'text'
    sender: msg.senderId === authId ? 'me' : 'them',
    createdAt: msg.createdAt,
    friendshipId: msg.friendshipId,  // now exists on Message
  }))
}

// ---------- DELETE message ----------
export async function deleteMessage(
  messageID: number,
  friendshipID: number
): Promise<void> {
  await request.delete(`${rootURL}/messages/${friendshipID}/${messageID}`)
}

// ---------- ADD message ----------
export async function addMessage(message: MessageData): Promise<void> {
  await request.put(`${rootURL}/messages`).send(message)
}
