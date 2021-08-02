'use strict'

module.exports = {
  Subscription: {
    notification: {
      subscribe: async (parent, args, { pubsub }) => {
        return await pubsub.subscribe('NOTIFICATION')
      }
    }
  }
}
