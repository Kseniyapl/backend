const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const secrets = require('../config/secrets.js');
const Users = require('../database/helpers/usersHelper.js');

// REGISTER ENDPOINT 
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// LOGIN ENDPOINT
// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user); 

//         res.status(200).json({
//           message: `Welcome ${user.username}!, have a token...`,
//           token, 
//         });
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(err => {

//     })
//     else res.end()
// })

// google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
)

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  req.session.user = req.user
  const token = generateToken(req.user)
  if (process.env.NODE_ENV === 'production') {
    res.redirect('http://vendme.herokuapp.com/#/token?=' + token)
  } else res.redirect('http://localhost:5000/#/token?=' + token)
})

function generateToken(stylist) {
  const payload = stylist
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router
