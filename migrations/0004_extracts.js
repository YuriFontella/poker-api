
exports.up = function (knex, Promise) {
  return knex.schema.createTable('extracts', function (table) {
    table.increments('id')
    table
      .integer('coin_id')
      .unsigned()
      .references('coins.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table
      .integer('subject')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.text('description', 255).notNullable()

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("extracts")
}
