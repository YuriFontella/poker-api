'use strict'

const fp = require('fastify-plugin')

const { resolve } = require('path')

module.exports = fp(async (app) => {
  app.register(require('fastify-static'), {
    root: resolve('public'),
    prefix: '/public'
  })
})