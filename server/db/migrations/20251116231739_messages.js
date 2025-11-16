/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.integer('friendship_id')
    table.integer('sender_id')
    table.string('message')
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('messages')
}
