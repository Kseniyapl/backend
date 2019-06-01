const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../database/routes/users-router.js');
const vendorRouter = require('../database/routes/vendors-router.js');
const marketRouter = require('../database/routes/markets-router.js');
const stallRouter = require('../database/routes/stalls-router.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter)
server.use('/api/vendor', vendorRouter)
server.use('/api/market', marketRouter)
server.use('/api/stalls', stallRouter)
server.use('/auth', authRouter)
//server.use('/', usersRouter)

server.get("/", (req, res) => {
  res.send("I am the Vendme backend server. Up and running!");
});

module.exports = server;