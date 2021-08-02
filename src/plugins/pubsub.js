'use script'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {
  app.decorate('pubsub', {
    publish: async (context) => {
      await context.pubsub.publish({
        topic: 'NOTIFICATION',
        payload: {
          notification: true
        }
      })
    }
  })
})
