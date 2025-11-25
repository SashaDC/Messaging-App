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
      bio: 'I live life dangerously',
      pfp: 'https://example.com/avatar1.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|456',
      email: 'janedoe@example.com',
      username: 'mysterywoman2945',
      bio: 'Drifting right around your corner',
      pfp: 'https://example.com/avatar2.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|789',
      email: 'extra@example.com',
      username: 'extraperson106',
      bio: 'Im a fill in',
      pfp: 'https://example.com/avatar3.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|691e41295bff98d97a3933ec',
      email: 'sashachambers10.12@gmail.com',
      username: 'SDC',
      bio: null,
      pfp: 'https://s.gravatar.com/avatar/fa0220c754a96fff47249726255c6ac0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
      created_at: knex.fn.now(),
    },
    {
      auth_id: 'auth0|69255ef1478d4d0894ea817e',
      email: 'asdasdasdasdasd@gmail.com',
      username: 'SDC2',
      bio: null,
      pfp: 'https://s.gravatar.com/avatar/3d9873126f432a2dc4392c5ca646f035?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fas.png',
      created_at: knex.fn.now(),
    },
  ])
}
