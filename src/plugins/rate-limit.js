'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {
  app.register(require('fastify-rate-limit'), {
    max: 50,
    ban: 5,
    timeWindow: '24h',
    errorResponseBuilder: () => (
      { statusCode: 429, error: 'Muitos pedidos', message: 'Limite de taxa excedido' }
    )
  })

})
