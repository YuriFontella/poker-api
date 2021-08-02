'use strict'

const { rule } = require('graphql-shield')

exports.isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, context, info) => {
    return context.current_user.role === 'admin' ? true : "Você não é um administrador!"
  }
)

exports.isUser = rule({ cache: 'contextual' })(
  async (parent, args, context, info) => {
    return context.current_user.role === 'user' ? true : "Você não é um usuário!"
  }
)