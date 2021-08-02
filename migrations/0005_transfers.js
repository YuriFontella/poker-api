
exports.up = function (knex, Promise) {
  return knex.schema.createTable('transfers', function (table) {
    table.increments('id')
    table
      .integer('from')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table
      .integer('to')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.decimal('value', 12, 2).notNullable()

    table
      .integer('performed')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("transfers")
}
