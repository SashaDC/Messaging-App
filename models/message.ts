export interface MessageData {
  friendshipId: number
  senderId: number
  message: string
  createdAt: string
}

export type Message = {
  id: number
  text: string
  friendshipId: number
  sender: 'me' | 'them'
  createdAt: string
}

