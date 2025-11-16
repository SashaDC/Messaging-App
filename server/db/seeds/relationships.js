/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('relationships').del()
  // Insert sample data
  await knex('relationships').insert([
    {
      user_one_id: 1,
      user_two_id: 2,
      status: 'accepted',
      created_at: knex.fn.now(),
    },
    {
      user_one_id: 1,
      user_two_id: 3,
      status: 'pending',
      created_at: knex.fn.now(),
    },
    {
      user_one_id: 2,
      user_two_id: 3,
      status: 'blocked',
      created_at: knex.fn.now(),
    },
  ])
}
