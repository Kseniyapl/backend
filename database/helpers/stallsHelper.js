const db = require('../dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  editStall,
  deleteStall,
  addStall,
  getSizeByVendorId
};

function find() {
  return db('stalls');
}

function findBy(filter) {
  return db('stalls').where(filter);
}

async function add(stall) {
const [id] = await db('stalls').insert(stall);

  return findById(id);
}

function findById(id) {
  return db('stalls')
    .where({ id })
    .first();
}
function editStall(id, data) {
  return db('stalls')
    .where({ id })
    .update({ ...data }, ['id'])
}
function deleteStall(id) {
  return db('stalls')
    .where({ id })
    .del()
}
function addStall(data) {
  return db('stalls').insert(data, ['id'])
}

function getSizeByVendorId(vendor_id) {
  return db('stall_sizes')
    .where({ vendor_id })
}

