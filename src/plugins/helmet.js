'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {
  app.register(require('fastify-helmet'), { contentSecurityPolicy: process.env.NODE_ENV === 'production' })
})
