const knex = require('knex')

const knexConfig = require('../knexfile.js')

const databaseEngine = process.env.DABTABASE_URL || 'development'

// module.exports = knex(knexConfig.development)
module.exports = knex(knexConfig[databaseEngine])
