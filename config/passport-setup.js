const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
require('dotenv').config()
const Users = require('../database/helpers/usersHelper')

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (error) {
    console.log(error)
  }
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id) // does my helper need to return an id?
    done(null, user.id)
  } catch (error) {
    console.log(error)
  }
})

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: '/auth/google/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, name, photos } = profile
      // check if user is already in database
      let exists = await Users.findByGoogleId(id) // can I see this helper fn?
      // add user
      if (!exists) {
        const result = await Users.add({
          google_id: id, // I have to add this field to the users table?
          username: displayName
        })
        exists = await Users.findByGoogleId(id)
        console.log('new user created: ' + JSON.stringify(exists))
        done(null, exists)
      } else {
        console.log(`user is ${JSON.stringify(exists)}`)
        done(null, exists)
      }
    }
  )
)
