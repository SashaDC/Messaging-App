import request from 'superagent'
import { MessageData, Message } from '../../models/message'

const rootURL = new URL(`/api/v1`, document.baseURI)

// snakecase issue!!
interface DBMessage {
  id: number
  sender_id: string
  friendship_id: number
  message: string
  created_at: string
}

// ---------- GET messages for logged-in user ----------
export async function getMessages(authId: string): Promise<Message[]> {
  const encodedAuthId = encodeURIComponent(authId) // The '|' kept causing errors since it the route wanted a number.
  const res = await request.get(`${rootURL}/messages/${encodedAuthId}`)
  const dbMessages = res.body as DBMessage[]

  // console.log('Raw DB data:', dbMessages)

  // Map DBMessage -> UI Message
  return dbMessages.map((msg) => ({
    id: msg.id,
    text: msg.message, // DB field 'message' -> UI 'text'
    sender: msg.sender_id === authId ? 'me' : 'them',
    createdAt: msg.created_at,
    friendshipId: msg.friendship_id,
  }))
}

// ---------- DELETE message ----------
export async function deleteMessage(
  messageID: number,
  friendshipID: number,
): Promise<void> {
  await request.delete(`${rootURL}/messages/${friendshipID}/${messageID}`)
}

// ---------- ADD message ----------
export async function addMessage(message: MessageData): Promise<void> {
  await request.put(`${rootURL}/messages`).send(message)
}
