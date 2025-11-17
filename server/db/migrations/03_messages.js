/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').notNullable().unique()
    table.integer('friendship_id').references('id').inTable('relationships')
    table.string('sender_id').references('auth_id').inTable('users')
    table.string('message').notNullable()
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('messages')
}
