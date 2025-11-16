/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('relationships', (table) => {
    table.increments('id')
    table.integer('user_one_id')
    table.integer('user_two_id')
    table.string('status')
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('relationships')
}
