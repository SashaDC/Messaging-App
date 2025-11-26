export interface MessageData {
  friendshipId: number
  senderId: string
  message: string
  createdAt: string | undefined
}

export type Message = {
  id: number
  text: string
  friendshipId: number
  sender: 'me' | 'them'
  createdAt: string
}
