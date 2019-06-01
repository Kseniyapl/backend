const router = require('express').Router();

const Users = require('../helpers/usersHelper')

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: 'user is not found' })
  } catch (error) {
    res.status(507).json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const count = await Users.deleteUser(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been deleted' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
})




module.exports = router;