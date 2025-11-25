import request from 'superagent'
import { MessageData } from '../../models/message'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function deleteMessage(messageID: number, friendshipID: number): Promise<void> {
  await request.delete(`${rootURL}/messages/${friendshipID}/${messageID}`)
} 

export async function addMessage(message: MessageData): Promise<void> {
  await request.put(`${rootURL}/messages`).send(message)
}