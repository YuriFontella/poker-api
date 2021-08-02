'use strict'

module.exports = {
  Query: {
    transfers: async (parent, args, context) => {
      return await context.app.knex('transfers')
    }
  },

  Transfer: {
    to: async (parent, args, context) => {
      return await context.app.knex('users').where('id', parent.to).where('role', 'player').first()
    },

    from: async (parent, args, context) => {
      return await context.app.knex('users').where('id', parent.from).where('role', 'player').first()
    },

    performed: async (parent, args, context) => {
      return await context.app.knex('users').where('id', parent.performed).first()
    }
  },

  Mutation: {
    new_transfer: async (parent, { transfer }, context) => {

      const subject = context.current_user.id

      transfer.performed = subject

      const response = await context.app.knex('transfers').insert(transfer)

      if (response) {

        const { from, to, value } = transfer

        const debt = {
          user_id: from,
          balance: value,
          type: 'debt'
        }

        const add = await context.app.coin.add(debt, subject, 'Saldo removido para transferência')

        const credit = {
          user_id: to,
          balance: value,
          type: 'credit'
        }

        if (add) {

          const remove = await context.app.coin.add(credit, subject, 'Valor recebido de uma transferência')

          if (remove)
            context.app.pubsub.publish(context)
        }
      }

      return true
    },

    remove_transfer: async (parent, { id }, context) => {

      const transfer = await context.app.knex('transfers')
        .where('id', id)
        .first()

      const data = [
        { user_id: transfer.from, balance: transfer.value, type: 'credit' },
        { user_id: transfer.to, balance: transfer.value, type: 'debt' }
      ]

      const trx = await context.app.knex.transaction()

      try {

        const response = await trx('transfers').where('id', id).del()

        if (response) {

          await Promise.all(data.map((item) => context.app.coin.add(item, context.current_user.id, 'Cancelamento de uma transferência')))

          await trx.commit()

          context.app.pubsub.publish(context)

          return true

        }

      } catch (e) {

        await trx.rollback()
      }

    }
  }
}