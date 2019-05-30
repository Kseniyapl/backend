require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'I like your nosering',
}