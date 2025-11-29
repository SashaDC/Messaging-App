import request from 'superagent'
import { MessageData, Message } from '../../models/message'

const rootURL = new URL(`/api/v1`, document.baseURI)

// snakecase issue!!
interface DBMessage {
  id: number
  sender_id: string
  friendship_id: number
  message: string
  image?: string
  created_at: string
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
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
    image: msg.image,
    sender: msg.sender_id === authId ? 'me' : 'them',
    createdAt: formatDate(msg.created_at),
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
