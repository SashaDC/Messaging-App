/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth_id').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('username').notNullable().unique()
    table.string('bio')
    table.string('pfp').defaultTo('/img/profile/examplepfp.svg')
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
