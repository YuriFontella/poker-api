'use strict'

const { shield, and, or, not } = require('graphql-shield')

const { isAdmin, isUser } = require('./rules')

const permissions = shield({
  Mutation: {
    new_player: isAdmin,
    new_coin: isAdmin,
    new_transfer: isAdmin,
    remove_transfer: isAdmin,
  },

  Query: {
    players: or(isAdmin, isUser),
    player: isAdmin,
    transfers: isAdmin
  }
})

module.exports = { permissions }
