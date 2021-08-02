'use strict'

module.exports = {
  Mutation: {
    login: async (parent, { email, password }, context) => {

      const user = await context.app.knex('users')
        .where({ email: email, status: true })
        .whereNot('role', 'player')
        .first()

      if (user) {

        const compare = context.app.bcrypt.compare(password, user.password)

        if (compare) {

          const token = await context.app.crypto.token()

          await context.app.knex('sessions')
            .insert({ user_id: user.id, access_token: context.app.crypto.hash(token) })

          return { user, token }
        }

      }

      return new Error('Usuário ou senha incorretos')

    }
  }
}
