/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('relationships', (table) => {
    table.increments('id').notNullable().unique()
    table.string('user_one_id').references('auth_id').inTable('users')
    table.string('user_two_id').references('auth_id').inTable('users')
    table.string('status').notNullable()
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('relationships')
}
