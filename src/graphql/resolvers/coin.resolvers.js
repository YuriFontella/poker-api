'use strict'

module.exports = {
  Mutation: {
    new_coin: async (parent, { coin }, context) => {

      const { type } = coin

      let description

      if (type === 'credit') {
        description = 'Crédito adicionado'
      }

      else if (type === 'debt') {
        description = 'Um desconto foi realizado'
      }

      const response = await context.app.coin.add(coin, context.current_user.id, description)

      if (response)
        context.app.pubsub.publish(context)

      return true
    }
  },

  Coin: {
    extract: async (parent, args, context) => {
      return await context.app.knex('extracts')
        .where('coin_id', parent.id)
        .first()
    }
  }
}