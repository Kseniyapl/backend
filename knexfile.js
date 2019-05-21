require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

const localPostgres = {
	host: process.env.HOST,
	database: process.env.DATABASE,
	port: process.env.PORT,
	user: process.env.USER,
	password: process.env.PASS || '',
};

const dbConnection = process.env.DATABASE_URL || localPostgres;

const dbSettings = {
	client: 'pg',
	connection: dbConnection,
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: './database/migrations',
		tableName: 'vendme_migrations',
	},
	seeds: {
		directory: './data/seeds',
	},
};

module.exports = {
	development: dbSettings,
	production: dbSettings,
};

/* module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database/vendme.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
}; */
