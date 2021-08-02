'use strict'

const fp = require('fastify-plugin')

const auth = require('mercurius-auth')

module.exports = fp(async (app) => {
  app.register(auth, {
    authContext(context) {
      return {
        identity: context.reply.request.headers['x-access-token']
      }
    },
    async applyPolicy(auth, parent, args, context, info) {

      if (!context.auth.identity) {

        throw new Error('Usuário não autenticado')
      }

      const session = await context.app.knex('sessions')
        .select('users.id', 'users.role', 'users.status')
        .innerJoin('users', (knex) => {
          knex.on('users.id', 'sessions.user_id').on('users.status', context.app.knex.raw('?', [true]))
        })
        .where({ access_token: context.app.crypto.hash(context.auth.identity), is_revoked: false })
        .first()

      if (session) {
        context.current_user = session

        return true
      }

      else throw new Error('A sessão não foi encontrada')

    },

    authDirective: 'auth'
  })
})
