<<<<<<< HEAD
export interface MessageData {
    friendshipId: number
    senderId: string
    message: string
    createdAt: string | undefined
}
=======
export type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt?: string
}

export interface MessageData {}

// {
//   friendship_id: 1,
//   sender_id: 'auth0|123',
//   message: 'Hi friend how are you?',
//   created_at: knex.fn.now(),
// },
>>>>>>> dev
