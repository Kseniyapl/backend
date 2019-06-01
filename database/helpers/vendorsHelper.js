const db = require('../dbConfig')
module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  editVendor,
  deleteVendor,
  getStallsByVendorId
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
  return db('vendors')
    .where({ id })
    .update({ ...data }, ['id'])
}
function deleteVendor(id) {
  return db('vendors')
    .where({ id })
    .del()
}
function getStallsByVendorId(vendor_id) {
  return db('stalls')
    .where({ vendor_id })
}
