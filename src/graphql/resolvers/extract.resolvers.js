'use strict'

module.exports = {
  Extract: {
    user: async (parent, args, context) => {
      return await context.app.knex('users')
        .where('id', parent.subject)
        .first()
    }
  }
}