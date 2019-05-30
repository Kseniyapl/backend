const db = require('../dbConfig')
module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  editVendor,
  deleteVendor
}

function getVendors() {
  return db('vendors')
}

function getVendorById(id) {
  return db ('vendors')
    .where({ id })
    .first()
}
function addVendor(data, userId) {
  return db('vendors').insert({...data, market_id:userId}, ['id'])
}
function editVendor(id, data) {
  if (data.id == id)
  return db('vendors')
    .where({ id })
    .update({ ...data }, ['id'])
else return null
}
function deleteVendor(id) {
  return db('vendors')
    .where({ id })
    .del()
}
