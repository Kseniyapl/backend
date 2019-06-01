const router = require('express').Router();

const Stalls = require('../helpers/stallsHelper')

router.get('/', (req, res) => {
  Stalls.find()
    .then(stalls => {
      res.json(stalls);
    })
    .catch(err => res.send(err));
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const stall = await Stalls.findById(id)
    stall
      ? res.status(200).json(stall)
      : res.status(404).json({ error: 'stall is not found' })
  } catch (error) {
    res.status(500).json({ error })
  }
})
router.post('/', async (req, res) => {
  try {
    const stall = await Stalls.addStall(req.body);
    res.status(201).json(stall);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the stall',
    });
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const count = await Stalls.deleteStall(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The stall has been deleted' });
    } else {
      res.status(404).json({ message: 'The stall could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the stall',
    });
  }
})
router.put('/:id', async (req, res) => {
  try {
    const stall = await Stalls.editStall(req.params.id, req.body);
    if (stall) {
      res.status(200).json(stall);
    } else {
      res.status(404).json({ message: 'The stall could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the stall',
    });
  }
})


router.get('/:id/size', async (req, res) => {
  const { id } = req.params
  try {
    const size = await Stalls.getSizeByVendorId(id)
    size
      ? res.status(200).json(size)
      : res.status(404).json({ error: 'Sizes in this vnedor are not found' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router;