'use strict'

const fp = require('fastify-plugin')

const mercurius = require('mercurius')

const { typeDefs, resolvers } = require('../graphql/tools')

const { permissions } = require('../graphql/shield/permissions')

const { applyMiddleware } = require('graphql-middleware')

const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

module.exports = fp(async (app) => {
  app.register(mercurius, {
    schema: schemaWithMiddleware,
    subscription: true,
    graphiql: true
  })
})
