
exports.up = function (knex, Promise) {
  return knex.schema.createTable('sessions', function (table) {
    table.increments('id')
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.text('access_token').index()
    table.boolean('is_revoked').index().defaultTo(false)

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("sessions")
}
