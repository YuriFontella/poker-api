exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').index()
    table.string('name', 255).notNullable()
    table.string('email', 255).unique()
    table.string('image', 255)
    table.string('role', 255).notNullable().defaultTo('admin')
    table.text('password', 255)
    table.boolean('status').notNullable().defaultTo(true)
    table.text('provider', 255).notNullable().defaultTo('credentials')

    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users")
}
