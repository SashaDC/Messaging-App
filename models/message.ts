export interface MessageData {
  friendshipId: number
  senderId: string
  message: string
  image?: string // Using Base64 instead of multer as multer is more or less for single saving like icon updating.
  createdAt: string
}

export type Message = {
  id: number
  text: string
  image?: string // Using Base64 instead of multer as multer is more or less for single saving like icon updating.
  friendshipId: number
  sender: 'me' | 'them'
  createdAt: string
}
