'use strict'

const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const { resolve } = require('path')

const typeDefs = mergeTypeDefs(loadFilesSync(resolve('src/graphql/schemas'), { extensions: ['graphql'] }))
const resolvers = mergeResolvers(loadFilesSync(resolve('src/graphql/resolvers', '*.resolvers.*')))

module.exports = {
  typeDefs, resolvers
}