'use strict'

module.exports = {
  Query: {
    players: async (parent, { limit, offset, name }, context) => {

      const knex = context.app.knex

      if (name) {
        offset = 0
      }

      const query = knex('users')
        .where('role', 'player')
        .offset(offset)
        .orderBy('id', 'ASC')

      if (name) {
        query.where('name', 'ilike', `%${name}%`)
      }

      if (limit > 0) {
        query.limit(limit)
      }

      return await query
    },

    player: async (parent, { id }, context) => {
      return await context.app.knex('users')
        .where('role', 'player')
        .where('id', id)
        .first()
    }
  },

  Player: {
    credits: async (parent, args, context) => {
      return await context.app.knex('coins')
        .sum({ value: 'balance' })
        .where('user_id', parent.id)
        .where('type', 'credit')
        .first()
    },

    debts: async (parent, args, context) => {
      return await context.app.knex('coins')
        .sum({ value: 'balance' })
        .where('user_id', parent.id)
        .where('type', 'debt')
        .first()
    },

    coins: async (parent, args, context) => {
      return await context.app.knex('coins')
        .where('user_id', parent.id)
    }
  },

  Mutation: {
    new_player: async (parent, { player }, context) => {

      if (player.password) {
        player.password = context.app.bcrypt.encrypt(player.password)
      }

      player.role = 'player'

      const [user_id] = await context.app.knex('users')
        .insert(player)
        .returning('id')

      if (user_id) {

        const coin = {
          user_id: user_id,
          balance: 10,
          type: 'credit'
        }

        await context.app.coin.add(coin, context.current_user.id, 'Adicionado com o cadastro do jogador')

        context.app.pubsub.publish(context)
      }

      return true
    }
  }
}