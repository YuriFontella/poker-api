const bcrypt = require('bcrypt')

const users = [
  {
    name: 'Administrador',
    email: 'admin@poker.com',
    role: 'admin',
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10))
  },
  {
    name: 'user',
    email: 'user@poker.com',
    role: 'user',
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10))
  },
]

exports.seed = async function (knex) {

  return knex('users').del()
    .then(function () {
      return knex('users').insert(users)
    })
}
