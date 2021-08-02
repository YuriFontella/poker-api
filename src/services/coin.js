'use script'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {
  app.decorate('coin', {
    add: add,
  })

  async function add(data, subject, description) {

    const trx = await app.knex.transaction()

    const [coin_id] = await trx('coins').insert(data).returning('id')

    if (coin_id) {

      const extract = await trx('extracts').insert({
        coin_id: coin_id,
        subject: subject,
        description: description
      })

      if (extract) {
        await trx.commit()
      }

      else await trx.rollback()
    }

    return true

  }

})
