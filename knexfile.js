module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '172.18.0.1',
      user: 'postgres',
      password: '123456',
      database: 'poker_20210801'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: {
      rejectUnauthorized: false
    }
  }
}
