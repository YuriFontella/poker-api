'use strict'

const fp = require('fastify-plugin')

const knexfile = require('../../knexfile')

module.exports = fp(async (app) => {

  app.register(require('fastify-knexjs'), knexfile[process.env.NODE_ENV], error => {
    throw Error(error)
  })
})
