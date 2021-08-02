
exports.up = function (knex, Promise) {
  return knex.schema.createTable('coins', function (table) {
    table.increments('id')
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .index()
      .onDelete('CASCADE')

    table.decimal('balance', 12, 2).notNullable()

    table.string('type', 255).notNullable().defaultTo('credit')

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("coins")
}
