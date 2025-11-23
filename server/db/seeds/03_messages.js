/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Insert sample data
  await knex('messages').insert([
    {
      friendship_id: 1,
      sender_id: 'auth0|123',
      message: 'Hi friend how are you?',
      created_at: knex.fn.now(),
    },
    {
      friendship_id: 1,
      sender_id: 'auth0|456',
      message: 'Im good thanks, just chilling.',
      created_at: knex.fn.now(),
    },
    {
      friendship_id: 1,
      sender_id: 'auth0|123',
      message: 'Im just waiting for extra to accept my friend request',
      created_at: knex.fn.now(),
    },
    {
      friendship_id: 1,
      sender_id: 'auth0|456',
      message: 'they blocked me lol',
      created_at: knex.fn.now(),
    },
  ])
}
