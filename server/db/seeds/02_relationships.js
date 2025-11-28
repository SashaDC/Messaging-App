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
      requested_by: 'auth0|456',
    },
    {
      user_one_id: 'auth0|123',
      user_two_id: 'auth0|789',
      status: 'pending',
      created_at: knex.fn.now(),
      requested_by: 'auth0|789',
    },
    {
      user_one_id: 'auth0|456',
      user_two_id: 'auth0|789',
      status: 'blocked',
      prev_status: 'pending',
      created_at: knex.fn.now(),
      blocked_by: 'auth0|789',
    },
  ])
}
