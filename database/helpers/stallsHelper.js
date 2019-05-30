const db = require('../dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  
};

function find() {
  return db('stalls');
}

function findBy(filter) {
  return db('stalls').where(filter);
}
function findById(id) {
  return db('stalls')
    .where({ id })
    .first();
}
async function add(stall) {
const [id] = await db('stalls').insert(stall);

  return findById(id);
}




