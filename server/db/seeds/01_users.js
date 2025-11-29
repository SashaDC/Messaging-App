/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Insert sample data
  await knex('users').insert([
    {
      auth_id: 'auth0|123',
      email: 'johndoe@example.com',
      username: 'mysteryman025',
      pfp: 'https://example.com/avatar1.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|456',
      email: 'janedoe@example.com',
      username: 'mysterywoman2945',
      pfp: 'https://example.com/avatar2.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|789',
      email: 'extra@example.com',
      username: 'extraperson106',
      pfp: 'https://example.com/avatar3.png',
      created_at: knex.fn.now(),
    },
  ])
}
