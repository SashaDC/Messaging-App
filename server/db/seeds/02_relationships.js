/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Insert sample data
  await knex('relationships').insert([
    {
      user_one_id: 'auth0|123',
      user_two_id: 'auth0|456',
      status: 'accepted',
      created_at: knex.fn.now(),
    },
    {
      user_one_id: 'auth0|123',
      user_two_id: 'auth0|789',
      status: 'pending',
      created_at: knex.fn.now(),
    },
    {
      user_one_id: 'auth0|456',
      user_two_id: 'auth0|789',
      status: 'blocked',
      created_at: knex.fn.now(),
    },
    {
      user_one_id: 'auth0|691e41295bff98d97a3933ec',
      user_two_id: 'auth0|69255ef1478d4d0894ea817e',
      status: 'accepted',
      created_at: knex.fn.now(),
    },
  ])
}
