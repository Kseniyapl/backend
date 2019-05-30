const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const passport = require('passport')
require('../config/passport-setup')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../database/routes/users-router.js');
const vendorRouter = require('../database/routes/vendors-router.js');
const marketRouter = require('../database/routes/markets-router.js');
const stallRouter = require('../database/routes/stalls-router.js');
const server = express();

const sessionOptions = {
  name: 'vendme',
  secret: process.env.COOKIE_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60 // hour
  })
}

// server.use(session(sessionOptions));
server.use(passport.initialize())
server.use(passport.session())
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/vendor', vendorRouter)
server.use('/api/market', marketRouter)
server.use('/api/stalls', stallRouter)
//server.use('/', usersRouter)
server.use('/auth', authRouter)

server.get('/', (req, res) => {
  res.send('I am the Vendme backend server. Up and running!')
})

module.exports = server
