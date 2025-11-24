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
